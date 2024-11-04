using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Infrastructure.Data;
using MediatR;

namespace InventoryManagement.Application.Requests.Queries.SellerProductsQueries
{
    public class GetSellerProductByNameQueryHandler : IRequestHandler<GetSellerProductByNameQuery, List<SellerProductDto>>
    {
        private readonly InventoryManagementContext _context;

        public GetSellerProductByNameQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<List<SellerProductDto>> Handle(GetSellerProductByNameQuery request, CancellationToken cancellationToken)
        {
            List<SellerProductDto> result = new List<SellerProductDto>();

            var re = await Task.Run(() =>
            {
                var Sellers = _context.SellerProducts.Where(x => x.ProductName.Equals(request.getname));
                foreach (var seller in Sellers)
                {
                    SellerProductDto sellerobj = new SellerProductDto();
                    sellerobj.SellerId = seller.SellerID;
                    sellerobj.ProductName = request.getname;
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