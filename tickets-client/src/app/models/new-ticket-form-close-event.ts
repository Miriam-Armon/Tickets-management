import { Ticket } from './ticket.model';

export type NewTicketFormAction = 'created' | 'cancelled';

export interface NewTicketFormCloseEvent {
  action: NewTicketFormAction;
  message?: string;
  ticket?: Ticket;
}
