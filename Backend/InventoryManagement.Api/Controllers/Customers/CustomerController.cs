using InventoryManagement.Application.Requests.Commands.CustomerCommands;
using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Application.Requests.Queries.CustomerQueries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryManagement.Api.Controllers.Customers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<int>GetCustomer(string email,string password)
        {
            GetCustomerQuery query = new GetCustomerQuery();
            query.Email = email;
            query.password = password;
            return await _mediator.Send(query);
        }

        [HttpPost]
        public async Task<int>AddCustomer([FromBody]AddCustomerCommand command )
        {
            return await _mediator.Send(command);
        }

    
    }
}
