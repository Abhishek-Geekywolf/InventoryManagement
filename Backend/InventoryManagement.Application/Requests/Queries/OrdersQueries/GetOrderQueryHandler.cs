using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Queries.OrdersQueries
{
    public class GetOrderQueryHandler : IRequestHandler<GetOrderQuery, List<OrdersDto>>
    {
        private readonly InventoryManagementContext _context;

        public GetOrderQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<List<OrdersDto>> Handle(GetOrderQuery request, CancellationToken cancellationToken)
        {
            var re = await Task.Run(() =>
            {
                List<OrdersDto> result = new List<OrdersDto>();
                var orders = _context.Orders.Include(x => x.OrderDetails).ThenInclude(y=>y.SellerProduct).Where(x=>x.CustomerID==request.getId);
                foreach (var order in orders)
                {
                    OrdersDto obj = new OrdersDto();
                    obj.Id = order.Id;
                    obj.OrderDate = order.OrderDate;
                    obj.CustomerID = order.CustomerID;
                    obj.TotalPrice = order.TotalPrice;
                    var OrderDetails = order.OrderDetails;
                    List<OrderDetailsDto> OorderDetailsList = new List<OrderDetailsDto>();
                    foreach (var item in OrderDetails)
                    {
                        OrderDetailsDto Orderdto = new OrderDetailsDto();
                        Orderdto.SellerProductID = item.SellerProductID;
                        Orderdto.Quantity = item.Quantity;
                        Orderdto.SubTotalPrice = item.SubTotalPrice;    
                        Orderdto.ProductName=item.SellerProduct.ProductName;
                        OorderDetailsList.Add(Orderdto);

                    }
                    obj.OrderDetails = OorderDetailsList;
                    result.Add(obj);
                }
                return result;
            });
            return re;
        }
    }
}