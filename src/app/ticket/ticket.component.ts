import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component
(
  {
    selector: 'app-ticket',
    standalone: true,
    imports:
    [
      RouterOutlet
    ],
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.scss'
  }
)
export class TicketComponent {

}
