import { Component, OnInit } from '@angular/core';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets: any = new Array();
  cargando: boolean = false;
  fecha_sacado: Date = new Date();

  constructor(
    public ticketsService: TicketsService

  ) { }

  ngOnInit(): void {
    this.listarTickets();
  }

  listarTickets() {
    this.cargando=true;
    this.ticketsService.listarTickets({fecha_sacado:this.fecha_sacado}, this);
  }

  despuesDeListarTickets(data) {
    this.tickets = data;
    this.cargando=false;
  }



}
