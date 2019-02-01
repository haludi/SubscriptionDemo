using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Demo.Models;
using Demo.Store;
using Raven.Client.Documents;

namespace Demo.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
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
