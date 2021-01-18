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
        private readonly static HashSet<string> _connections = new HashSet<string>();
        //public override async Task OnConnectedAsync()
        //{
        //    await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
        //    await base.OnConnectedAsync();
        //}

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
    }
}