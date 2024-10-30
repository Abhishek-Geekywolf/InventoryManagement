using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.SellerCommands
{
    public class AddSellerCommandHandler : IRequestHandler<AddSellerCommand, int>
    {
        private readonly InventoryManagementContext _context;

        public AddSellerCommandHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddSellerCommand request, CancellationToken cancellationToken)
        {
            Sellers sellers = new Sellers();
            sellers.Name = request.Name;
            sellers.Email = request.Email;
            sellers.PhoneNumber = request.PhoneNumber;
            _context.Sellers.Add(sellers);
            return await _context.SaveChangesAsync();
        }

    }
}
