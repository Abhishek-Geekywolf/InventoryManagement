using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.OrderCommands
{
    public class AddOrderCommand : IRequest<int>
    {

        public DateTime OrderDate { get; set; }
        public int CustomerId { get; set; }

    }
}
