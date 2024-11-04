using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.DTOs
{
    public class OrderOrderDetailsSellerProductDto
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }

        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public double? SubPrice { get; set; }
        public DateTime OrderDate { get; set; }
    }
}