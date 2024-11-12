using InventoryManagement.Application.Requests.Commands.SellerCommands;
using InventoryManagement.Application.Requests.Commands.SellerProductCommands;
using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Application.Requests.Queries.SellerProductsQueries;
using InventoryManagement.Application.Requests.Queries.SellerQueries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Api.Controllers.Sellers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SellerController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<int> AddSellers(AddSellerCommand command)
        {
            return await _mediator.Send(command);
        }
        [HttpGet]
        public async Task<int>GetSeller(string email,string password)
        {
            GetSellerQuery query = new GetSellerQuery(); 
            query.Email = email;
            query.Password = password;
            
            return await _mediator.Send(query);
        }

        [HttpGet("ProductName")]
        public async Task<List<SellerProductDto>>getProduct(string? name,int id)
        {
            FilterProducts query= new FilterProducts();
            query.id = id;
            query.ProductName = name;
            return await _mediator.Send(query);
        }
    }
}
