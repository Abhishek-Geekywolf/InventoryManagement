using InventoryManagement.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Infrastructure.configuration
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customers>
    {
        public void Configure(EntityTypeBuilder<Customers> builder)
        {
            builder.ToTable("Customers");

            builder.Property(x=>x.Id).ValueGeneratedOnAdd().HasColumnName("Id");
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x=>x.Email).HasMaxLength(128);
            builder.Property(x=>x.Name).HasMaxLength(128);
    }
    }
}
