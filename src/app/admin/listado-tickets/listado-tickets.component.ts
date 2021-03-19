import { Component, OnInit } from '@angular/core';
import { ListadoTicketsService } from './listado-tickets.service';

@Component({
  selector: 'app-listado-tickets',
  templateUrl: './listado-tickets.component.html',
  styleUrls: ['./listado-tickets.component.css']
})
export class ListadoTicketsComponent implements OnInit {

  tickets: any = new Array();
  cargando: boolean = false;
  fecha_sacado: Date = new Date();

  constructor(
    public ticketsService: ListadoTicketsService

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
