using ChatApp.Model;
using ChatApp.Service;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ChatApp.Hubs
{
    public class MessageHub : Hub
    {
        private readonly IUserService _service;

        public MessageHub(IUserService service)
        {
            _service = service;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            if (httpContext != null)
            {
                try
                {
                    var userEmail = httpContext.Request.Query["email"].ToString();
                    var connId = Context.ConnectionId.ToString();

                    var user = _service.GetUserByEmail(userEmail);

                    user.IsConnected = true;
                    user.ConnectionId = connId;

                    _service.UpdateUser(user);

                    await Clients.All.SendAsync("UpdateUserList", _service.GetAllConnectedUsers());
                }
                catch (Exception ex)
                {
                }
            }
        }

        public async Task NewMessage(Message msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }

        public async Task SendMessageToUser(string connectionId, string msg)
        {
            await Clients.Client(connectionId).SendAsync("ReceivedMessage", msg);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var httpContext = Context.GetHttpContext();

            if (httpContext != null)
            {
                try
                {
                    var userEmail = httpContext.Request.Query["email"].ToString();

                    var connId = Context.ConnectionId.ToString();

                    var user = _service.GetUserByEmail(userEmail);

                    user.IsConnected = false;
                    user.ConnectionId = null;

                    _service.UpdateUser(user);

                    await Clients.All.SendAsync("UpdateUserList", _service.GetAllConnectedUsers());
                }
                catch (Exception ex)
                {
                }
            }
        }
    }
}