using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Methods
{
    public class PriceQuantityUpdate
    {
        private readonly InventoryManagementContext _context;

        public PriceQuantityUpdate(InventoryManagementContext context)
        {
            _context = context;
        }

        public void Update(OrderDetails obj,int SellerProductId,int OrderId) 
        {
            var SellerProduct = _context.SellerProducts.FirstOrDefault(x => x.Id == (SellerProductId));
            SellerProduct.OrderedQuantity =SellerProduct.OrderedQuantity + obj.Quantity;
            obj.SubTotalPrice = SellerProduct.Price*obj.Quantity;

            var OrderObj=_context.Orders.FirstOrDefault(x => x.Id== (OrderId));
            OrderObj.TotalPrice = OrderObj.TotalPrice + obj.SubTotalPrice;
            _context.SaveChanges();

        }
    }
}
