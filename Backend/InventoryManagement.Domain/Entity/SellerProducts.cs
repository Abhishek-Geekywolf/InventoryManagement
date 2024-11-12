using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Domain.Entity
{
    public class SellerProducts
    {
        public int Id { get; set; }  // This should be auto-generated
        public int SellerID { get; set; }
        public Sellers Seller { get; set; }
        public string ProductName { get; set; }
        public int TotalQuantity { get; set; }
        public int? OrderedQuantity { get; set; }
        public double Price { get; set; }

        public SellerProducts()
        {
            OrderedQuantity = 0;
        }
    }
}

