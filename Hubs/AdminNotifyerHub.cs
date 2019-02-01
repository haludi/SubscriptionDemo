using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Demo.Hubs
{
    public class AdminNotifyerHub : Hub
    {
        public void Notify(string message)
        {
            Clients.All.SendAsync("OrderAdded", message);
        }
    }
}
