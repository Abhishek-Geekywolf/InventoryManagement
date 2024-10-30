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
            OrderDetails orderdetails=new OrderDetails();
            orderdetails.OrderID = request.OrderId;
            orderdetails.SellerProductID = request.SellerProductId;
            orderdetails.Quantity = request.Quantity;
            _context.OrderDetails.Add(orderdetails);
            PriceQuantityUpdate obj = new PriceQuantityUpdate(_context);
            obj.Update(orderdetails,request.SellerProductId,request.OrderId);
            return await _context.SaveChangesAsync();


        }
    }
}
