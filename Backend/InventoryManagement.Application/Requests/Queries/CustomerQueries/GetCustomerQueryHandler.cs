using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            
            //var re = await Task.Run(() =>
            //{
            //    List<CustomerDto> result = new List<CustomerDto>();
            //    var customers = _context.Customers.Where(x=>x.Email==request.Email);
            //    foreach (var customer in customers)
            //    {
            //        if (request.password == customer.Password)
            //        {
            //            CustomerDto cus = new CustomerDto();
            //            cus.Id = customer.Id;
            //            cus.Name = customer.Name;
            //            cus.Email = customer.Email;
            //            cus.PhoneNumber = customer.PhoneNumber;
            //            result.Add(cus);
            //        }
            //        else
            //        {
            //            result.Add("Not found");
            //        }
                   
            //    }
            //    return result;
            //});
            //return re;
        }
    }
}
