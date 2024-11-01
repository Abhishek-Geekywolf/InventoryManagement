using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Queries.SellerQueries
{
    public class GetSellerQueryHandler : IRequestHandler<GetSellerQuery, List<SellerDto>>
    {
        private readonly InventoryManagementContext _context;

        public GetSellerQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<List<SellerDto>> Handle(GetSellerQuery request, CancellationToken cancellationToken)
        {
            var re = await Task.Run(() =>
            {
                List<SellerDto> result = new List<SellerDto>();
                var sellers = _context.Sellers;
                foreach (var seller in sellers)
                {
                    SellerDto sellerobj = new SellerDto();
                    sellerobj.Id = seller.Id;
                    sellerobj.Name = seller.Name;
                    sellerobj.Email = seller.Email;
                    result.Add(sellerobj);
                }
                return result;
            });
            return re;
        }
    }
}
