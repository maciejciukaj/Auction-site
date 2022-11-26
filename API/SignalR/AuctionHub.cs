using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class AuctionHub : Hub
    {
        public async Task SendMessage(string msg)
        {
            await Clients.All.SendAsync("newPrice", Context.ConnectionId, msg);
        }

        public async Task BroadcastBidData(string data, string connectionId)    
                => await Clients.Client(connectionId).SendAsync("broadcasttoclient", data);

        public async Task BroadcastAllBidData(string data, string connectionId)    
        => await Clients.Others.SendAsync("broadcasttoclient", data);

        public async Task AddToGroup(string groupName)     
            => await Groups.AddToGroupAsync(Context.ConnectionId, groupName); 
        public async Task RemoveFromGroup(string groupName)     
            => await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

        public async Task BroadcastToGroup(string groupName)
         => await Clients.Group(groupName).SendAsync("broadcasttogroup", $"{Context.ConnectionId} has joined the group {groupName}.");

          public string GetConnectionId() => Context.ConnectionId;
    }
}