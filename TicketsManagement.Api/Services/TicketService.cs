using TicketManagement.Api.Dal;
using TicketManagement.Api.Models;

namespace TicketManagement.Api.Services;

public class TicketService : ITicketService
{
    private readonly ITicketDataStore _ticketStore;

    public TicketService(ITicketDataStore ticketStore)
    {
        _ticketStore = ticketStore;
    }

    public IEnumerable<Ticket> GetTickets(TicketStatus? status) => _ticketStore.GetAll(status);

    public Ticket CreateTicket(CreateTicketRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Subject))
            throw new ArgumentException("Subject cannot be empty");

        return _ticketStore.Add(request);
    }

    public bool CloseTicket(int ticketId)
    {
        var ticket = _ticketStore.GetAll(null).FirstOrDefault(t => t.TicketId == ticketId);
        if (ticket is null || ticket.Status == TicketStatus.Closed)
            return false;
        return _ticketStore.Close(ticketId);
    }
}
