using Microsoft.AspNetCore.Mvc;
using TicketManagement.Api.Models;
using TicketManagement.Api.Services;

namespace TicketManagement.Api.Controllers;

[ApiController]
[Route("tickets")]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _service;

    public TicketsController(ITicketService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetTickets(TicketStatus? status)
    {
        return Ok(_service.GetTickets(status));
    }

    [HttpPost]
    public IActionResult CreateTicket(CreateTicketRequest request)
    {
        try
        {
            var ticket = _service.CreateTicket(request);
            return Created($"/tickets/{ticket.TicketId}", ticket);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id:int}/close")]
    public IActionResult CloseTicket(int id)
    {
        return _service.CloseTicket(id)
            ? NoContent()
            : NotFound();
    }
}
