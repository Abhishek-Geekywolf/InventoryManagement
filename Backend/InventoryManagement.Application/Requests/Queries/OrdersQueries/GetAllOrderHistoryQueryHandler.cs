using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Application.Requests.Queries.OrdersQueries
{
    public class GetAllOrderHistoryQueryHandler : IRequestHandler<GetAllOrderHistoryQuery, List<OrderOrderDetailsSellerProductDto>>
    {
        private readonly InventoryManagementContext _context;

        public GetAllOrderHistoryQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }


        public async Task<List<OrderOrderDetailsSellerProductDto>> Handle(GetAllOrderHistoryQuery request, CancellationToken cancellationToken)
        {
            var re = await Task.Run(() =>
            {
                List<OrderOrderDetailsSellerProductDto> result = new List<OrderOrderDetailsSellerProductDto>();
                var orders = _context.Orders.Include(x => x.OrderDetails).ThenInclude(y => y.SellerProduct).Where(x => x.OrderDetails.Any(y => y.SellerProduct.SellerID == request.getid));
                //foreach (var order in orders)
                //{
                //    OrderOrderDetailsSellerProductDto obj = new OrderOrderDetailsSellerProductDto();
                //    obj.OrderId = order.Id;
                //    obj.CustomerId = order.CustomerID;

                //    var re = order.OrderDetails;
                //    foreach (var item in order.OrderDetails)
                //    {
                //        obj.SubPrice = item.SubTotalPrice;
                //        obj.Quantity = item.Quantity;
                //        obj.ProductName = item.ProductName;
                //    }
                //    obj.OrderDate = order.OrderDate;

                //    result.Add(obj);
                //}

                foreach (var order in orders)
                {
                    foreach (var item in order.OrderDetails)
                    {
                        var obj = new OrderOrderDetailsSellerProductDto
                        {
                            OrderId = order.Id,
                            CustomerId = order.CustomerID,
                            SubPrice = item.SubTotalPrice,
                            Quantity = item.Quantity,
                            ProductName = item.SellerProduct?.ProductName // Use null-conditional operator
                        };

                        obj.OrderDate = order.OrderDate;

                        result.Add(obj);
                    }
                }
                return result;
            });
            return re;

        }
    }
}