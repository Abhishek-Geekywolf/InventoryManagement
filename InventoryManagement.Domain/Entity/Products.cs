using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Domain.Entity
{
    public class Products
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int? AvailableQuantity { get; set; }
        
    }
}

