using InventoryManagement.Application.Requests.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Update
{
    public class UpdateSellerProductQuery:IRequest<List<SellerProductDto>>
    {
        public int SellerProductId { get; set; }

        public updateproductdto update { get; set; }
    }

}
