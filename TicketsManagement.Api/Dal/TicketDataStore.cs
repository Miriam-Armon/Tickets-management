using TicketManagement.Api.Models;

namespace TicketManagement.Api.Dal;

public class TicketDataStore : ITicketDataStore
{
    private readonly List<Ticket> _tickets = new();
    private int _ticketsCounter = 1;

    public IEnumerable<Ticket> GetAll(TicketStatus? status)
    {
        return status.HasValue
            ? _tickets.Where(t => t.Status == status)
            : _tickets;
    }

    public Ticket Add(CreateTicketRequest request)
    {
        var ticket = new Ticket(
            TicketId: _ticketsCounter++,
            UserId: request.UserId,
            Subject: request.Subject,
            Description: request.Description,
            Status: TicketStatus.Open
        );

        _tickets.Add(ticket);
        return ticket;
    }

    public bool Close(int ticketId)
    {
        var ticket = _tickets.FirstOrDefault(t => t.TicketId == ticketId);
        if (ticket is null)
            return false;

        var index = _tickets.IndexOf(ticket);
        _tickets[index] = ticket with { Status = TicketStatus.Closed };
        return true;
    }

}
