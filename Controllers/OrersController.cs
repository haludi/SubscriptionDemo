using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Demo.Models;
using Demo.Store;
using Raven.Client.Documents;

namespace Demo.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        [HttpGet]
        public async Task<IEnumerable<Order>> Get(int startIndex, int amount)
        {
            using (var session = InternetShopStore.Store.OpenAsyncSession())
            {
                return await session.Query<Order>().ToListAsync();
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
