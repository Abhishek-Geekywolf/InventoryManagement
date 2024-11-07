using InventoryManagement.Application.Requests.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Queries.OrdersQueries
{
    public class GetOrderQuery:IRequest<List<OrdersDto>>
    {
        public int getId { get; set; } 
    }
}
