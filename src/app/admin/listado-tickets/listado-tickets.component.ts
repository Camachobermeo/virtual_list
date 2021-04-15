import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/entidades/Ticket';
import { Tienda } from 'src/app/entidades/Tienda';
import { UtilService } from 'src/app/servicios/util.service';
import { TiendaService } from '../tienda/tienda.service';
import { ListadoTicketsService } from './listado-tickets.service';

@Component({
  selector: 'app-listado-tickets',
  templateUrl: './listado-tickets.component.html',
  styleUrls: ['./listado-tickets.component.css']
})
export class ListadoTicketsComponent implements OnInit {

  tickets: any = new Array();
  ticketSeleccionado: Ticket = new Ticket();
  cargando: boolean = false;
  fecha_sacado: Date = null;
  mostrarBoton: boolean = false;
  tiendas: Array<Tienda> = new Array();
  tiendaSeleccionada: any = null;

  constructor(
    public ticketsService: ListadoTicketsService,
    public tiendaService: TiendaService,
    public utilService: UtilService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.tiendaService.listarTiendas({}, this);
    if (location.hash == '#/ver') {
      this.mostrarBoton = true;
    }
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
    this.cargando = false;
  }

  listarTickets(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.ticketsService.listarTickets({ fecha_sacado: this.fecha_sacado, sucursal: this.tiendaSeleccionada }, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  atender(ticket, texto) {
    this.ticketSeleccionado = ticket;
    this.cargando = true;
    this.ticketsService.cambiarEstadoTicket({ secuencial: this.ticketSeleccionado.secuencial, estado: texto }, texto, this);
  }

  despuesDeCambiarEstadoTicket(data, estado) {
    this.toastr.success(data.mensaje, "Aviso");
    this.cargando = false;
    this.ticketSeleccionado.estado = estado;
  }

  despuesDeListarTickets(data) {
    this.tickets = data;
    this.cargando = false;
  }

}
