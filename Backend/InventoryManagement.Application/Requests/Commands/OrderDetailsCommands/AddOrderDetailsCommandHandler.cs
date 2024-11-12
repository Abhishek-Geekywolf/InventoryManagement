using InventoryManagement.Application.Methods;
using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.OrderDetailsCommands
{
    public class AddOrderDetailsCommandHandler : IRequestHandler<AddOrderDetailsCommand, int>
    {
        private readonly InventoryManagementContext _context;

        public AddOrderDetailsCommandHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddOrderDetailsCommand request, CancellationToken cancellationToken)
        {
            //OrderDetails orderdetails=new OrderDetails();
            Orders orders = new Orders();
            orders.OrderDate = request.OrderDate;
            orders.CustomerID = request.CustomerId;
            orders.TotalPrice = request.OrderItems.Sum(item => item.SubTotalPrice);
            _context.Orders.Add(orders);
             await _context.SaveChangesAsync();

            foreach (var item in request.OrderItems)
            {
                var orderDetails = new OrderDetails
                {
                    OrderID = orders.Id,
                    SellerProductID = item.SellerProductID,
                    Quantity = item.Quantity,
                    SubTotalPrice = item.SubTotalPrice
                };
                orders.OrderDetails.Add(orderDetails);

                PriceQuantityUpdate obj = new PriceQuantityUpdate(_context);
                obj.Update(orderDetails, item.SellerProductID);

            }
            return await _context.SaveChangesAsync();


        }
    }
}
