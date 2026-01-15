import { TicketStatus } from '../../models/ticket-status.enum';

export const TICKETS_VIEW_CONSTANTS = {
  filterLabel: ': הצג פניות',
  empty: {
    title: 'אין פניות כעת',
    subtitle: 'כרגע אין פניות להצגה.'
  },
  columns: {
    subject: 'נושא',
    status: 'סטטוס',
    description: 'תיאור',
    actions: ''
  },
  filterOptions: {
    all: TicketStatus.All,
    open: TicketStatus.Open,
    closed: TicketStatus.Closed
  },
  statusMap: {
    [TicketStatus.All]: 'הכל',
    [TicketStatus.Open]: 'פתוח',
    [TicketStatus.Closed]: 'סגור'
  }
};

