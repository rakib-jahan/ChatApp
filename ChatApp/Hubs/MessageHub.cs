using ChatApp.Model;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChatApp.Hubs
{
    public class MessageHub : Hub
    {
        private readonly Dictionary<string, string> _connections = new Dictionary<string, string>();
        public override async Task OnConnectedAsync()
        {
            //var httpContext = Context.GetHttpContext();

            //if (httpContext == null)
            //    throw new Exception("...");

            //var email = httpContext.Request.Query["email"].ToString();

            //_connections.Add(Context.ConnectionId, email);

            //await Clients.All.SendAsync("UpdateUserList", _connections);
            //await base.OnConnectedAsync();

            var httpContext = Context.GetHttpContext();

            if (httpContext != null)
            {
                try
                {
                    var userName = httpContext.Request.Query["email"].ToString();
                    var connId = Context.ConnectionId.ToString();

                    _connections.Add(userName, connId);

                    await Clients.All.SendAsync("UpdateUserList", _connections);
                }
                catch (Exception)
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

        //public override async Task OnDisconnectedAsync(Exception exception)
        //{
        //    await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        //    await base.OnDisconnectedAsync(exception);
        //}

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var httpContext = Context.GetHttpContext();

            if (httpContext != null)
            {
                var userName = httpContext.Request.Query["email"].ToString();
                _connections.Remove(userName);

                await Clients.All.SendAsync("UpdateUserList", _connections);
            }
        }
    }
}