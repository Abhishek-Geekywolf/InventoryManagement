using InventoryManagement.Application.Requests.Commands.SellerCommands;
using InventoryManagement.Application.Requests.Commands.SellerProductCommands;
using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Application.Requests.Queries.SellerProductsQueries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Api.Controllers.SellerProduct
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SellerProductController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("id")]
        public async Task<List<SellerProductDto>> GetSellerProductById(int id)
        {
            GetSellerProductByIDQuery query = new GetSellerProductByIDQuery();
            query.getid = id;
            return await _mediator.Send(query);
        }
        [HttpPost]
        public async Task<int> AddSellerProduct(AddSellerProductCommand command)
        {

            return await _mediator.Send(command);
        }

        [HttpGet("name")]
        public async Task<List<SellerProductDto>> GetSellerProductByName(string name)
        {
            GetSellerProductByNameQuery query = new GetSellerProductByNameQuery();
            query.getname = name;
            return await _mediator.Send(query);
        }

        [HttpGet]
        public async Task<List<SellerProductDto>> GetSellerProducts()
        {
            GetSellerProductsQuery query = new GetSellerProductsQuery();
            return await _mediator.Send(query);
        }

    }
}
