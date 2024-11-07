using InventoryManagement.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Application.Requests.Queries.CustomerQueries
{
    public class GetCustomerQueryHandler : IRequestHandler<GetCustomerQuery, int>
    {
        private readonly InventoryManagementContext _context;

        public GetCustomerQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(GetCustomerQuery request, CancellationToken cancellationToken)
        {
            var customer = await _context.Customers
               .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (customer == null || request.password != customer.Password)
            {
                return 0;
            }

            return customer.Id;
            
           
        }
    }
}
