using System.Collections.Generic;
using System.Threading.Tasks;
using Demo.Hubs;
using Microsoft.AspNetCore.Mvc;
using Demo.Models;
using Demo.Store;
using Microsoft.AspNetCore.SignalR;
using Raven.Client.Documents;

namespace Demo.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private readonly IHubContext<AdminNotifyerHub> _hubContext;

        public OrdersController(IHubContext<AdminNotifyerHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int startIndex, int amount)
        {
            using (var session = InternetShopStore.Store.OpenAsyncSession())
            {
                var orders = await session.Query<Order>().ToListAsync();
                return Json(orders);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Buy(string productId)
        {
            using (var session = InternetShopStore.Store.OpenAsyncSession())
            {
                var product = await session.LoadAsync<Product>(productId);
                if (null == product)
                    return BadRequest();

                var order = new Order(product);
                await session.StoreAsync(order);
                await session.SaveChangesAsync();

                return Ok();
            }
        }
    }
}
