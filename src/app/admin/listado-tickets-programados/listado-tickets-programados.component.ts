import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Fila } from 'src/app/entidades/Fila';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { TicketProgramado } from 'src/app/entidades/TicketProgramado';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { FilaService } from '../fila/fila.service';
import { ListadoTicketsService } from '../listado-tickets/listado-tickets.service';
import { SucursalService } from '../sucursal/sucursal.service';

@Component({
  selector: 'app-listado-tickets-programados',
  templateUrl: './listado-tickets-programados.component.html',
  styleUrls: ['./listado-tickets-programados.component.css']
})
export class ListadoTicketsProgramadosComponent implements OnInit {

  tickets: any = new Array();
  ticketSeleccionado: TicketProgramado = new TicketProgramado();
  cargando: boolean = false;
  fecha_sacado: any = null;
  mostrarBoton: boolean = false;
  sucursales: Array<Sucursal> = new Array();
  sucursalSeleccionada: any = null;
  usuario: Usuario = new Usuario();
  filas: Array<Fila> = new Array();
  filaSeleccionada: any = null;

  constructor(
    public ticketsService: ListadoTicketsService,
    public sucursalService: SucursalService,
    public utilService: UtilService,
    public toastr: ToastrService,
    public filaService: FilaService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.fecha_sacado = new Date().getFullYear() + "-" + (new Date().getMonth() >= 10 ? "" : "0") + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.sucursalSeleccionada = this.usuario.codigo_sucursal;
    this.sucursalService.listarSucursales({}, this);
    if (location.hash == '#/ver') {
      this.mostrarBoton = true;
    }
  }

  despuesDeListarSucursales(data) {
    this.sucursales = data;
    if (this.sucursalSeleccionada) {
      this.listarFilas();
    } else {
      this.cargando = false;
      document.getElementById("recargar") ? document.getElementById("recargar").click() : null;
    }
  }

  listarFilas() {
    this.cargando = true;
    this.filaService.listarFilas({ sucursal: this.sucursalSeleccionada }, this);
  }

  despuesDeListarFilas(data) {
    this.filas = data;
    this.cargando = false;
    document.getElementById("recargar") ? document.getElementById("recargar").click() : null;
  }

  listarTickets(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.ticketsService.listarTickets({ fecha_sacado: this.fecha_sacado, sucursal: this.sucursalSeleccionada, tabla: 'ticket_programado' }, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  atender(ticket, texto) {
    this.ticketSeleccionado = ticket;
    this.cargando = true;
    this.ticketsService.cambiarEstadoTicket(
      { secuencial: this.ticketSeleccionado.secuencial, estado: texto, usuario: this.usuario.username },
      texto, this);
  }

  despuesDeCambiarEstadoTicket(data, estado) {
    this.toastr.success(data.mensaje, "Aviso");
    this.cargando = false;
  }

  despuesDeListarTickets(data) {
    this.tickets = data;
    this.cargando = false;
  }

}
