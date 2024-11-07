using InventoryManagement.Application.Requests.Commands.CustomerCommands;
using InventoryManagement.Application.Requests.Commands.OrderCommands;
using InventoryManagement.Application.Requests.DTOs;
using InventoryManagement.Application.Requests.Queries.OrdersQueries;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Api.Controllers.Orders
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<int> AddOrders([FromBody] AddOrderCommand command)
        {
            return await _mediator.Send(command);
        }
        [HttpGet]
        public async Task<List<OrdersDto>>GetOrders(int id)
        {
            GetOrderQuery query = new GetOrderQuery();
            query.getId = id;
            return await _mediator.Send(query);
        }

        [HttpGet("name")]
        public async Task<List<OrderOrderDetailsSellerProductDto>> GetOrderHistoryByName(string name)
        {
            GetOrderHistoryByNameQuery query = new GetOrderHistoryByNameQuery();
            query.getname = name;
            return await _mediator.Send(query);
        }


        [HttpGet("id")]
        public async Task<ActionResult<List<OrderOrderDetailsSellerProductDto>>> GetOrderHistoryById(int id)
        {
            var query = new GetAllOrderHistoryQuery();
            query.getid = id;
            var result = await _mediator.Send(query);

            if (result == null || result.Count == 0)
            {
                return NotFound("No order history found.");
            }

            return Ok(result);
        }


    }
}
