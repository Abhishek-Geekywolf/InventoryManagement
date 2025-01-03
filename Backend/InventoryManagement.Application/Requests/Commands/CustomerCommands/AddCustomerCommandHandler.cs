﻿using InventoryManagement.Domain.Entity;
using InventoryManagement.Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Application.Requests.Commands.CustomerCommands
{
    public class AddCustomerCommandHandler : IRequestHandler<AddCustomerCommand, int>
    {
        private readonly InventoryManagementContext _context;

        public AddCustomerCommandHandler(InventoryManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddCustomerCommand request, CancellationToken cancellationToken)
        {
            Customers customers = new Customers(request.Name, request.Email, request.PhoneNumber, request.Password);
            _context.Customers.Add(customers);
            return await _context.SaveChangesAsync();
        }
    }
}
