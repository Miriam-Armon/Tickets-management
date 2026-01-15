import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NewTicketFormComponent } from '../new-ticket-form/new-ticket-form.component';
import { TicketsViewComponent } from '../tickets-view/tickets-view.component';
import { HOME_CONSTANTS } from './home.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TicketsViewComponent, NewTicketFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showNewTicketForm = false;
  message = '';
  showMessage = false;
  @ViewChild(TicketsViewComponent) ticketsView?: TicketsViewComponent;

  readonly constants = HOME_CONSTANTS;

  openNewTicketForm() {
    this.showNewTicketForm = true;
  }

  closeNewTicketForm() {
    this.showNewTicketForm   = false;
  }

  onNewTicketFormClosed(event: any) {
    this.showNewTicketForm = false;
    if (!event) return;
    if (event.action === 'created') {
      this.message = event.message ?? this.constants.notification.ticketAdded;
      this.showMessage = true;
      if (this.ticketsView && typeof this.ticketsView.loadTickets === 'function') {
        this.ticketsView.loadTickets();
      }
      setTimeout(() => this.showMessage = false, 3000);
    } else {
      // cancelled — nothing to show, just close the modal
      this.showMessage = false;
    }
  }
}
