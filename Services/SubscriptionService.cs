using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Demo.Hubs;
using Demo.Models;
using Demo.Store;
using Microsoft.AspNetCore.SignalR;
using Raven.Client.Documents.Subscriptions;
using Raven.Client.Exceptions.Documents.Subscriptions;

namespace Demo.Services
{
    public interface ISubscriptionService : IDisposable
    {
        void Subscribe();
    }

    public class SubscriptionService : ISubscriptionService
    {
        private readonly IHubContext<AdminNotifyerHub> _hubContext;
        private SubscriptionWorker<Order> _subscription;

        public SubscriptionService(IHubContext<AdminNotifyerHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public void Dispose()
        {
            _subscription?.Dispose();
        }

        public void Subscribe()
        {
            const string subName = "NewOrders";
            var subscriptionCreationOptions = new SubscriptionCreationOptions
            {
                Name = subName,
            };

            try
            {
                InternetShopStore.Store.Subscriptions.GetSubscriptionState(subName, InternetShopStore.DatabaseName);
            }
            catch (SubscriptionDoesNotExistException)
            {
                InternetShopStore.Store.Subscriptions.Create<Order>(options: subscriptionCreationOptions, database: InternetShopStore.DatabaseName);
            }
            _subscription = InternetShopStore.Store.Subscriptions.GetSubscriptionWorker<Order>(subName);
            _subscription.Run(x =>
                    x.Items.ForEach(async item =>
                    {
                        await _hubContext.Clients.All.SendAsync("OrderAdded", $"{item.Result.Product.Name}");
                    }),
                CancellationToken.None);
        }
    }
}
