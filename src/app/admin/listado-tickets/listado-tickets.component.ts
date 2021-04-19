import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/entidades/Ticket';
import { Tienda } from 'src/app/entidades/Tienda';
import { TipoOperacion } from 'src/app/entidades/TipoOperacion';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { TiendaService } from '../tienda/tienda.service';
import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
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
  fecha_sacado: any = null;
  mostrarBoton: boolean = false;
  tiendas: Array<Tienda> = new Array();
  tiendaSeleccionada: any = null;
  usuario: Usuario = new Usuario();
  tipos: Array<TipoOperacion> = new Array();
  tipoSeleccionado: any = null;

  constructor(
    public ticketsService: ListadoTicketsService,
    public tiendaService: TiendaService,
    public utilService: UtilService,
    public toastr: ToastrService,
    public tipoService: TipoOperacionService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.fecha_sacado = new Date().getFullYear() + "-" + (new Date().getMonth() >= 10 ? "" : "0") + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.tiendaSeleccionada = this.usuario.codigo_tienda;
    this.tiendaService.listarTiendas({}, this);
    if (location.hash == '#/ver') {
      this.mostrarBoton = true;
    }
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
    if (this.tiendaSeleccionada) {
      this.listarTipos();
    } else {
      this.cargando = false;
      document.getElementById("recargar") ? document.getElementById("recargar").click() : null;
    }
  }

  listarTipos() {
    this.cargando = true;
    this.tipoService.listarTipos({ tienda: this.tiendaSeleccionada }, this);
  }

  despuesDeListarTipos(data) {
    this.tipos = data;
    this.cargando = false;
    document.getElementById("recargar") ? document.getElementById("recargar").click() : null;
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
    this.ticketsService.cambiarEstadoTicket(
      { secuencial: this.ticketSeleccionado.secuencial, estado: texto, usuario: this.usuario.codigo },
      texto, this);
  }

  despuesDeCambiarEstadoTicket(data, estado) {
    this.toastr.success(data.mensaje, "Aviso");
    this.cargando = false;
    this.ticketSeleccionado.estado = estado;
    this.ticketSeleccionado.usuario = this.usuario.codigo;
  }

  despuesDeListarTickets(data) {
    this.tickets = data;
    this.cargando = false;
  }

  noHacerNada() { }

}
