using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Domain.Entity
{
    public class OrderDetails
    {
        public int Id { get; set; }


        [ForeignKey("Orders")]
        public int OrderID { get; set; }
        public Orders Order { get; set; }

        [ForeignKey("SellerProducts")]
        public int SellerProductID { get; set; }
        public SellerProducts SellerProduct { get; set; }
        public int Quantity { get; set; }

        public double? SubTotalPrice { get; set; }

        public OrderDetails() 
        { 
            SubTotalPrice = 0;
        }



    }
}
