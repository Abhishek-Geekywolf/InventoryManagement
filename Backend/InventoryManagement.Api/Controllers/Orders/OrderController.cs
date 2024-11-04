﻿using InventoryManagement.Application.Requests.Commands.CustomerCommands;
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
        public async Task<List<OrdersDto>>GetOrders()
        {
            GetOrderQuery query = new GetOrderQuery();
            return await _mediator.Send(query);
        }
    }
}