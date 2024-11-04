using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Application.Requests.Queries.OrdersQueries
{
    public class GetOrderHistoryByNameQueryHandler : IRequestHandler<GetOrderHistoryByNameQuery, List<OrderOrderDetailsSellerProductDto>>

    {

        private readonly InventoryManagementContext _context;

        public GetOrderHistoryByNameQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }
        public async Task<List<OrderOrderDetailsSellerProductDto>> Handle(GetOrderHistoryByNameQuery request, CancellationToken cancellationToken)
        {
            var re = await Task.Run(() =>
            {
                List<OrderOrderDetailsSellerProductDto> result = new List<OrderOrderDetailsSellerProductDto>();
                var orders = _context.Orders.Include(x => x.OrderDetails).ThenInclude(y => y.SellerProduct).Where(x => x.OrderDetails.Any(y => y.SellerProduct.ProductName == request.getname));
                foreach (var order in orders) 
                {
                    OrderOrderDetailsSellerProductDto obj = new OrderOrderDetailsSellerProductDto();
                    obj.OrderId=order.Id;
                    obj.CustomerId=order.CustomerID;
                    obj.ProductName=request.getname;
                    var re= order.OrderDetails;
                    foreach (var item in order.OrderDetails)
                    {
                        obj.SubPrice=item.SubTotalPrice;
                        obj.Quantity=item.Quantity;
                    }
                    obj.OrderDate=order.OrderDate;
                   

                //foreach (var order in orders)
                //{
                //    OrdersDto obj = new OrdersDto();
                //    obj.Id = order.Id;
                //    obj.OrderDate = order.OrderDate;
                //    obj.CustomerID = order.CustomerID;
                //    obj.TotalPrice = order.TotalPrice;
                //    var OrderDetails = order.OrderDetails;
                //    List<OrderDetailsDto> OorderDetailsList = new List<OrderDetailsDto>();
                //    foreach (var item in OrderDetails)
                //    {
                //        OrderDetailsDto Orderdto = new OrderDetailsDto();
                //        Orderdto.SellerProductID = item.SellerProductID;
                //        Orderdto.Quantity = item.Quantity;
                //        Orderdto.SubTotalPrice = item.SubTotalPrice;
                //        OorderDetailsList.Add(Orderdto);
                //    }
                //    obj.OrderDetails = OorderDetailsList;
                    result.Add(obj);
                }
                return result;
            });
            return re;
        }
    }
}
