using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagement.Domain.Entity
{
    public class cusmanager
    {
        public int Id { get; set; }
        public int EmpID {  get; set; }
        public int ManagerId {  get; set; }
    }
}
