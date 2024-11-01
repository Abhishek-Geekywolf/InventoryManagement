using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.ProductCommands
{
    public class AddProductCommand:IRequest<int>
    {
        public string ProductName { get; set; }
    }
}
