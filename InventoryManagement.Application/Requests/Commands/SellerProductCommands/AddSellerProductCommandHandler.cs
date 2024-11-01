using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.SellerProductCommands
{
    public class AddSellerProductCommandHandler:IRequestHandler<AddSellerProductCommand,int>
    {
        private readonly InventoryManagementContext _context;

        public AddSellerProductCommandHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddSellerProductCommand request, CancellationToken cancellationToken)
        {
            SellerProducts sellerProducts = new SellerProducts();
            sellerProducts.SellerID = request.SellerID;
            sellerProducts.ProductName = request.ProductName;
            sellerProducts.TotalQuantity = request.TotalQuantity;
            sellerProducts.Price = request.Price;
            _context.SellerProducts.Add(sellerProducts);
            return await _context.SaveChangesAsync();
        }
    }
}
