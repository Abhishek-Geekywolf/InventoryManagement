using InventoryManagement.Domain.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.DTOs
{
    public class OrdersDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public double? TotalPrice { get; set; }
        public int CustomerID { get; set; }
        public List<OrderDetailsDto> OrderDetails { get; set; }

    }
}
