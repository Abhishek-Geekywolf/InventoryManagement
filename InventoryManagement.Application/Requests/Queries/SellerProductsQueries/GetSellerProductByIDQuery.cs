using InventoryManagement.Application.Requests.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Queries.SellerProductsQueries
{
    public class GetSellerProductByIDQuery:IRequest<List<SellerProductDto>>
    {
        public int getid { get; set; }
    }
}
