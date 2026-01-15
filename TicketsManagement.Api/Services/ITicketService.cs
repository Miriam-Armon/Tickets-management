using TicketManagement.Api.Models;

namespace TicketManagement.Api.Services;
public interface ITicketService
{
    IEnumerable<Ticket> GetTickets(TicketStatus? status);
    Ticket CreateTicket(CreateTicketRequest request);
    bool CloseTicket(int ticketId);
}
