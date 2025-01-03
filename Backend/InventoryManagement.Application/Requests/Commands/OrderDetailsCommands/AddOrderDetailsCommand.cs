﻿using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Domain.Entity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.OrderDetailsCommands
{
    public class AddOrderDetailsCommand:IRequest<int>
    {
        //public int OrderId { get; set; }
        //public int SellerProductId { get; set; }
        //public int Quantity { get; set; }
        public DateTime OrderDate { get; set; }
        public int CustomerId { get; set; }

        public List<OrderDetailsDto> OrderItems { get; set; }
    }
}
