using InventoryManagement.Application.Requests.Commands.OrderDetailsCommands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Api.Controllers.Orderdetails
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderDetailsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<int> GetOrderdetails(AddOrderDetailsCommand command)
        {
            return await _mediator.Send(command);
        }
    }
}
