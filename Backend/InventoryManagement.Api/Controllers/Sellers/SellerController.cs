﻿using InventoryManagement.Application.Requests.Commands.SellerCommands;
using InventoryManagement.Application.Requests.Commands.SellerProductCommands;
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
    }
}
