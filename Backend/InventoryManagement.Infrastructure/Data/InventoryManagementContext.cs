using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Infrastructure.Data
{
    public class InventoryManagementContext:DbContext
    {
        public InventoryManagementContext(DbContextOptions<InventoryManagementContext>options):base(options) { }

        public DbSet<Sellers> Sellers { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }

        public DbSet<SellerProducts>SellerProducts { get; set; }

        public DbSet<Customers> Customers { get; set; }


        public DbSet<Orders> Orders { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SellerConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
        }


    }
}
