using InventoryManagement.Domain.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.DTOs
{
    public class OrderDetailsDto
    {
        public int SellerProductID { get; set; }
        public string ProductName {  get; set; }
        public int Quantity { get; set; }
        public double? SubTotalPrice { get; set; }
    }
}
