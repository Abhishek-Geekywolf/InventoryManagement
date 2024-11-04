using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.OrderCommands
{
    public class AddOrderCommandHandler : IRequestHandler<AddOrderCommand, int>
    {
        private readonly InventoryManagementContext _context;

        public AddOrderCommandHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddOrderCommand request, CancellationToken cancellationToken)
        {
            Orders orders=new Orders();
            orders.OrderDate = request.OrderDate;
            orders.CustomerID = request.CustomerId;
            _context.Orders.Add(orders);
            return await _context.SaveChangesAsync();
        }
    }
}
