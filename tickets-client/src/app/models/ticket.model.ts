export interface Ticket {
  ticketId?: number;
  subject: string;
  description: string;
  userId: string;
  status: 'Open' | 'Closed';
}
