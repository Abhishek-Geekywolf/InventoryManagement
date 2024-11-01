using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.ProductCommands
{
    internal class AddProductCommandHandler:IRequestHandler<AddProductCommand,int>
    {
        private readonly InventoryManagementContext _context;

        public AddProductCommandHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public Task<int> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        //public async Task<int> Handle(AddProductCommand request, CancellationToken cancellationToken)
        //{
        //    Products products=new Products();
        //    products.ProductName = request.ProductName;
        //    _context.Products.Add(products);    
        //    return await _context.SaveChangesAsync();   
        //}
    }
}
