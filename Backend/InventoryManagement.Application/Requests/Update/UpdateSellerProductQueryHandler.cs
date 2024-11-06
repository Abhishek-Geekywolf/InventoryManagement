using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Update
{
    public class UpdateSellerProductQueryHandler : IRequestHandler<UpdateSellerProductQuery, List<SellerProductDto>>
    {
        private InventoryManagementContext _context;

        public UpdateSellerProductQueryHandler(InventoryManagementContext context)
        {
            this._context = context;
        }

        public Task<List<SellerProductDto>> Handle(UpdateSellerProductQuery request, CancellationToken cancellationToken)
        {
            var product = _context.SellerProducts.Find(request.SellerProductId);
            product.Price=request.update.price;
            product.TotalQuantity=product.TotalQuantity+request.update.quantity;
            _context.SellerProducts.Update(product);
            _context.SaveChanges();

            var obj=new SellerProductDto
            { 
                ProductName=product.ProductName, 
                Price=product.Price,
                AvailableQuantity=product.TotalQuantity
            };
            return Task.FromResult(new List<SellerProductDto>{ obj});

        }
    }
}
