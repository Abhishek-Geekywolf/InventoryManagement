using InventoryManagement.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Infrastructure.configuration
{
    public class SellerConfiguration : IEntityTypeConfiguration<Sellers>
    {
        public void Configure(EntityTypeBuilder<Sellers> builder)
        {
            builder.ToTable("Sellers");
            builder.HasKey(x => x.Id);
            builder.Property(x=>x.Id).ValueGeneratedOnAdd().HasColumnName("Id");
            builder.Property(x => x.Email).HasMaxLength(256);
                builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.Name).HasMaxLength(256);



            builder.HasMany(x => x.SellerProducts).WithOne(x => x.Seller).HasForeignKey(x => x.SellerID);
        }
    }
}
