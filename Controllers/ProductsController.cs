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
    public class ProductsController : Controller
    {
        private readonly IHubContext<AdminNotifyerHub> _hubContext;

        public ProductsController(IHubContext<AdminNotifyerHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> Get(int startIndex, int amount)
        {
            using (var session = InternetShopStore.Store.OpenAsyncSession())
            {
                return await session.Query<Product>().ToListAsync();
            }
        }
    }
}
