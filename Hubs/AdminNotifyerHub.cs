using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Demo.Models;
using Demo.Services;
using Demo.Store;
using Microsoft.AspNetCore.SignalR;
using Raven.Client.Documents.Subscriptions;
using Raven.Client.Exceptions.Documents.Subscriptions;

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
