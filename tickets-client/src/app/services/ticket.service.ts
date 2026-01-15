import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { API_CONSTANTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = API_CONSTANTS.TICKETS;

  constructor(private http: HttpClient) {}

  getTickets(status?: string): Observable<Ticket[]> {
    let params = new HttpParams();
    if (status && status !== 'All') {
      params = params.set('status', status);
    }
    return this.http.get<Ticket[]>(this.apiUrl, { params });
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  closeTicket(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/close`, {});
  }
}
