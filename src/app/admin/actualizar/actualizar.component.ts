import { Component, OnInit } from '@angular/core';
import { ListadoTicketsService } from '../listado-tickets/listado-tickets.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  tickets: any = new Array();
  cargando: boolean = false;
  fecha_sacado: Date = new Date();
  ticketSeleccionado : any ;
  
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
    this.ticketSeleccionado = this.tickets [0].codigo_tipo_operacion + "-" + this.tickets [0].numeracion;
    this.cargando=false;
  }

}
