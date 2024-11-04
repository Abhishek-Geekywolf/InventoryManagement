using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Domain.Entity
{
    public class Orders
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public double? TotalPrice { get; set; }

        [ForeignKey("Customers")]
        public int CustomerID { get; set; }
        public Customers Customer { get; set; }
        public List<OrderDetails> OrderDetails { get; set; }

        public Orders() 
        {
            TotalPrice = 0;
        }
    }
}
