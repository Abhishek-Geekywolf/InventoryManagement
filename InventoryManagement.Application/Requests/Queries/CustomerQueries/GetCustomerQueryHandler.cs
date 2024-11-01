using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Queries.CustomerQueries
{
    public class GetCustomerQueryHandler : IRequestHandler<GetCustomerQuery, List<CustomerDto>>
    {
        private readonly InventoryManagementContext _context;

        public GetCustomerQueryHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<List<CustomerDto>> Handle(GetCustomerQuery request, CancellationToken cancellationToken)
        {
            var re = await Task.Run(() =>
            {
                List<CustomerDto> result = new List<CustomerDto>();
                var customers = _context.Customers;
                foreach (var customer in customers)
                {
                    CustomerDto cus = new CustomerDto();
                    cus.Id = customer.Id;
                    cus.Name = customer.Name;
                    cus.Email = customer.Email;
                    cus.PhoneNumber = customer.PhoneNumber;
                    result.Add(cus);
                }
                return result;
            });
            return re;
        }
    }
}
