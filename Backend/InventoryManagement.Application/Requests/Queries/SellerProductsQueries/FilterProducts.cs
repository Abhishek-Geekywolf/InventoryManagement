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
    public class FilterProducts:IRequest<List<SellerProductDto>>
    {
        public int id {  get; set; }
        public string? ProductName { get; set; }
    }
    public class FilterProductsHandler : IRequestHandler<FilterProducts, List<SellerProductDto>>
    {
        private readonly InventoryManagementContext _context;

        public FilterProductsHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<List<SellerProductDto>> Handle(FilterProducts request, CancellationToken cancellationToken)
        {
            
            List<SellerProductDto> result = new List<SellerProductDto>();
            if (request.ProductName != null)
            {
                var re = await Task.Run(() =>
                {
                    var Sellers = _context.SellerProducts.Where(x => x.ProductName == request.ProductName && x.SellerID == request.id);
                    foreach (var seller in Sellers)
                    {
                        SellerProductDto sellerobj = new SellerProductDto();
                        sellerobj.SellerProductId = seller.Id;
                        sellerobj.SellerId = seller.SellerID;
                        sellerobj.ProductName = seller.ProductName;
                        sellerobj.AvailableQuantity = seller.TotalQuantity - seller.OrderedQuantity;
                        sellerobj.Price = seller.Price;
                        result.Add(sellerobj);
                    }

                    return result;
                });
                return re;

            }
            else
            {
                var re = await Task.Run(() =>
                {
                    var Sellers = _context.SellerProducts.Where(x=>x.SellerID == request.id);
                    foreach (var seller in Sellers)
                    {
                        SellerProductDto sellerobj = new SellerProductDto();
                        sellerobj.SellerProductId = seller.Id;
                        sellerobj.SellerId = seller.SellerID;
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
}

       
   