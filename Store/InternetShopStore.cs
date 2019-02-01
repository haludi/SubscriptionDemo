using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Raven.Client.Documents;

namespace Demo.Store
{
    public static class InternetShopStore
    {
        private static readonly Lazy<IDocumentStore> LazyStore = new Lazy<IDocumentStore>(CreateStore);

        public static IDocumentStore Store => LazyStore.Value;

        private static IDocumentStore CreateStore()
        {
            var store = new DocumentStore()
            {
                Urls = new[] { "http://localhost:8080" },
                Database = "InternetShop"
            }.Initialize();

            return store;
        }
    }
}
