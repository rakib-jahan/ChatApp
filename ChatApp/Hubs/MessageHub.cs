using ChatApp.Model;
using ChatApp.Service;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ChatApp.Hubs
{
    public class MessageHub : Hub
    {
        private readonly IUser _userService;
        private readonly IChat _chatService;

        public MessageHub(IUser user, IChat chat)
        {
            _userService = user;
            _chatService = chat;
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

                    var user = _userService.GetUserByEmail(userEmail);

                    user.IsConnected = true;
                    user.ConnectionId = connId;

                    _userService.UpdateUser(user);

                    await Clients.All.SendAsync("UpdateUserList", _userService.GetAllConnectedUsers());
                }
                catch (Exception ex)
                {
                }
            }
        }

        public async Task SendMessageToUser(MessageViewModel msg)
        {
            await _chatService.AddChat(msg);
            await Clients.Client(msg.receiverConnectionId).SendAsync("ReceivedMessage", msg);
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

                    var user = _userService.GetUserByEmail(userEmail);

                    user.IsConnected = false;
                    user.ConnectionId = null;

                    _userService.UpdateUser(user);

                    await Clients.All.SendAsync("UpdateUserList", _userService.GetAllConnectedUsers());
                }
                catch (Exception ex)
                {
                }
            }
        }
    }
}