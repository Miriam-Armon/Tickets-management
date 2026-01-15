import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { TicketStatus } from '../../models/ticket-status.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TICKETS_VIEW_CONSTANTS } from './tickets-view.constants';


@Component({
  selector: 'app-tickets-view',
  standalone: true,
  templateUrl: './tickets-view.component.html',
  styleUrls: ['./tickets-view.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class TicketsViewComponent implements OnInit {
  tickets: Ticket[] = [];
  filter: TicketStatus = TicketStatus.All;
  readonly constants = TICKETS_VIEW_CONSTANTS;
  readonly TicketStatus = TicketStatus;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets(this.filter).subscribe({
      next: data => {
        console.log('loaded tickets raw', data);
        this.tickets = data;
      },
      error: () => console.error('Failed to load tickets')
    });
  }

  closeTicket(id: number) {
    console.log('closeTicket called with id=', id);
    if (id === null || id === undefined) {
      console.warn('closeTicket: invalid id, aborting');
      return;
    }
    
    this.ticketService.closeTicket(id).subscribe({
      next: () => {
        console.log('ticket closed, reloading');
        this.loadTickets();
      },
      error: (err) => console.error('Failed to close ticket', err)
    });
  }

  onFilterChange(status: TicketStatus) {
    this.filter = status;
    this.loadTickets();
  }

  getStatusString(status?: string) {
    if (!status) return '';
    try {
      return (this.constants as any).statusMap?.[status as string] ?? status;
    } catch {
      return status;
    }
  }
}

