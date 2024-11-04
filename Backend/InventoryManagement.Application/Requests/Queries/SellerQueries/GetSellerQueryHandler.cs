using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Queries.SellerQueries
{
    public class GetSellerQueryHandler : IRequestHandler<GetSellerQuery, int>
    {
        private readonly InventoryManagementContext _context;

        public GetSellerQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(GetSellerQuery request, CancellationToken cancellationToken)
        {
            

            var seller = await _context.Sellers.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (seller == null || request.Password!=seller.Password)
            {
                return 0;
            }
           
            return seller.Id;
        }
    }
}
