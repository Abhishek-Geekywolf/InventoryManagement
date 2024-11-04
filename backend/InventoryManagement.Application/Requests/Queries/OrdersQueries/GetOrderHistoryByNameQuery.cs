﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryManagement.Application.Requests.DTOs;
using MediatR;

namespace InventoryManagement.Application.Requests.Queries.OrdersQueries
{
    public class GetOrderHistoryByNameQuery:IRequest<List<OrderOrderDetailsSellerProductDto>>
    {
        public string getname { get; set; }
    }
}
