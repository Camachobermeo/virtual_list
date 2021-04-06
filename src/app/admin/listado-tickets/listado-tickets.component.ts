import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  mostrarBoton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public ticketsService: ListadoTicketsService

  ) { }

  ngOnInit(): void {
    this.listarTickets();
    if(this.route.snapshot.url.toString() == 'Ver'){
      this.mostrarBoton = true;
    }
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
