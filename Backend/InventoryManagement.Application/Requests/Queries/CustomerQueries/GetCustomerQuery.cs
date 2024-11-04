using InventoryManagement.Application.Requests.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Queries.CustomerQueries
{
    public class GetCustomerQuery:IRequest<int>
    {
        public string Email {  get; set; }
        public string password {  get; set; }
    }
}
