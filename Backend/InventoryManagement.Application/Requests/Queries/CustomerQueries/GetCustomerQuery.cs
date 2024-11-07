using MediatR;

namespace InventoryManagement.Application.Requests.Queries.CustomerQueries
{
    public class GetCustomerQuery:IRequest<int>
    {
        public string Email {  get; set; }
        public string password {  get; set; }
    }
}
