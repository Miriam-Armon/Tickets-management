using TicketManagement.Api.Models;

namespace TicketManagement.Api.Dal;

public interface ITicketDataStore
{
    IEnumerable<Ticket> GetAll(TicketStatus? status);
    Ticket Add(CreateTicketRequest request);
    bool Close(int ticketId);
}
