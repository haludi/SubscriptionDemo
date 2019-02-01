using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo.Models
{
    public class Order
    {
        public Order(Product product)
        {
            Product = product;
            DateTime = DateTime.Now;
        }

        public string Id { get; }
        public Product Product { get; }
        public DateTime DateTime { get; }
    }
}
