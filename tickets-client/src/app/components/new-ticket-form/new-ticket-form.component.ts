import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { NewTicketFormCloseEvent } from '../../models/new-ticket-form-close-event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TICKET_FORM_CONSTANTS } from './new-ticket-form.constants';


@Component({
  selector: 'app-new-ticket-form',
  standalone: true,
  templateUrl: './new-ticket-form.component.html',
  styleUrls: ['./new-ticket-form.component.scss'],
  imports: [CommonModule, FormsModule] 
})

export class NewTicketFormComponent {
  @Output() closed = new EventEmitter<NewTicketFormCloseEvent>();
  subject = '';
  description = '';
  userId: string | null = null;
  errorMessage: string = '';

  readonly constants = TICKET_FORM_CONSTANTS;

  constructor(private ticketService: TicketService) {}

  submitTicket(form?: NgForm) {
    this.errorMessage = '';
    if (form && form.invalid) {
      this.errorMessage = TICKET_FORM_CONSTANTS.validation.formInvalid;
      form.control.markAllAsTouched();
      return;
    }
    if (!this.subject || !this.userId) {
      this.errorMessage = TICKET_FORM_CONSTANTS.validation.formMissing;
      return;
    }

    const newTicket: Ticket = {
      subject: this.subject,
      description: this.description,
      userId: this.userId,
      status: 'Open'
    };

    this.ticketService.createTicket(newTicket).subscribe({
      next: (createdTicket) => {
        this.subject = '';
        this.description = '';
        this.userId = null;
        this.closed.emit({ action: 'created', message: TICKET_FORM_CONSTANTS.notification.ticketAdded, ticket: createdTicket ?? newTicket });
      },
      error: () => {
        this.errorMessage = TICKET_FORM_CONSTANTS.errors.createFailed;
      }
    });
  }

  close() {
    this.closed.emit({ action: 'cancelled' });
  }
}
