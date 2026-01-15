import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home.component';
import { TicketsViewComponent } from './components/tickets-view/tickets-view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tickets', component: TicketsViewComponent },
  { path: '**', redirectTo: '' }
];