using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Queries.SellerProductsQueries
{
    public class GetSellerProductByIDQueryHandler : IRequestHandler<GetSellerProductByIDQuery, List<SellerProductDto>>
    {
        private readonly InventoryManagementContext _context;

        public GetSellerProductByIDQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<List<SellerProductDto>> Handle(GetSellerProductByIDQuery request, CancellationToken cancellationToken)
        {
            List<SellerProductDto> result = new List<SellerProductDto>();
            var re = await Task.Run(() =>
            {
                var Sellers = _context.SellerProducts.Where(x => x.SellerID.Equals(request.getid));
                foreach (var seller in Sellers)
                {
                    SellerProductDto sellerobj = new SellerProductDto();
                    sellerobj.SellerProductId = seller.Id;
                    sellerobj.SellerId = request.getid;
                    sellerobj.ProductName = seller.ProductName;
                    sellerobj.AvailableQuantity = seller.TotalQuantity - seller.OrderedQuantity;
                    sellerobj.Price = seller.Price;
                    result.Add(sellerobj);
                }

                return result;
            });
            return re;
        }
    }
}
