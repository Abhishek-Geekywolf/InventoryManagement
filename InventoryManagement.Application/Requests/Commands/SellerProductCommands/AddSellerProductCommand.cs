using InventoryManagement.Domain.Entity;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.SellerProductCommands
{
    public class AddSellerProductCommand:IRequest<int>
    {
        public int SellerID { get; set; }
        public string ProductName { get; set; }
        public int TotalQuantity { get; set; }
        public double Price { get; set; }
    }
}
