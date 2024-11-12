using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Domain.Entity
{
    public class Customers
    {
        public int Id { get; set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string PhoneNumber { get; private set; }

        public string Password { get; private set; }    
        public Customers(string Name, string Email,string PhoneNumber,string Password) 
        {
            Name = Name;
            Email = Email;
            PhoneNumber = PhoneNumber;
            Password = Password;
        
        }


    }
}
