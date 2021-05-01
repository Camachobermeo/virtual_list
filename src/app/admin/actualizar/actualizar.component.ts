import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/entidades/Ticket';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { Fila } from 'src/app/entidades/Fila';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { ListadoTicketsService } from '../listado-tickets/listado-tickets.service';
import { SucursalService } from '../sucursal/sucursal.service';
import { FilaService } from '../fila/fila.service';
import { ActualizarService } from './actualizar.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  ticketSeleccionado: any = new Ticket();
  ultimoTicket: Ticket = new Ticket();
  nombreTicket: any = null;

  filas: Array<Fila> = new Array();
  fila: any = null;
  usuario: Usuario = new Usuario();
  cargando: boolean = false;
  sucursales: Array<Sucursal> = new Array();
  sucursalSeleccionada: any = null;

  constructor(
    public actualizarService: ActualizarService,
    public sucursalService: SucursalService,
    public utilService: UtilService,
    public toastr: ToastrService,
    public filaService: FilaService,
    public ticketsService: ListadoTicketsService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.sucursalSeleccionada = this.usuario.codigo_sucursal;
    this.sucursalService.listarSucursales({}, this);
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
    this.ticketSeleccionado = new Ticket();
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.actualizarService.obtenerTicketLibreOEnAtencion(
        { sucursal: this.sucursalSeleccionada, fila: this.fila, usuario: this.usuario.username },
        this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  omitir(form: NgForm) {
    this.cargando = true;
    this.ticketSeleccionado = new Ticket();
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.actualizarService.omitir(
        { sucursal: this.sucursalSeleccionada, fila: this.fila, usuario: this.usuario.username },
        this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeObtenerTicketLibreOEnAtencion(data) {
    this.ticketSeleccionado = data[0];
    let programado = this.ticketSeleccionado && this.ticketSeleccionado['hora_cita'] ? 'R-' : '';
    this.nombreTicket = this.ticketSeleccionado ? programado + this.ticketSeleccionado.codigo_fila + "-" + this.ticketSeleccionado.numeracion : null;
    this.cargando = false;
  }

  atender(texto) {
    if (this.ticketSeleccionado) {
      if (texto == 'ATENDIDO' && !this.ticketSeleccionado.estado) {
        this.toastr.warning("Debe iniciar atención del ticket mostrado en pantalla.", "Aviso");
      } else {
        this.ultimoTicket = this.ticketSeleccionado;
        this.cargando = true;
        if (this.ticketSeleccionado['hora_cita']) {
          this.ticketsService.cambiarEstadoTicketProgramado(
            { secuencial: this.ticketSeleccionado.secuencial, estado: texto, usuario: this.usuario.username },
            texto, this);
        } else {
          this.ticketsService.cambiarEstadoTicket(
            { secuencial: this.ticketSeleccionado.secuencial, estado: texto, usuario: this.usuario.username },
            texto, this);
        }
      }
    } else {
      this.toastr.warning("No existe un ticket por atender.", "Aviso");
    }
  }

  retroceder() {
    if (this.ultimoTicket) {
      this.cargando = true;
      this.ticketsService.cambiarEstadoTicket(
        { secuencial: this.ultimoTicket.secuencial, estado: null, usuario: this.usuario.username },
        '', this);
    } else {
      this.toastr.warning("No existe un ticket por atender.", "Aviso");
    }
  }

  despuesDeCambiarEstadoTicket(data, estado) {
    if (estado) {
      this.toastr.success(data.mensaje, "Aviso");
      this.cargando = false;
      this.ticketSeleccionado.estado = estado;
      this.ticketSeleccionado.usuario = this.usuario.username;
      if (estado == 'ATENDIDO') {
        document.getElementById("recargar") ? document.getElementById("recargar").click() : null;
      }
    } else {
      this.ultimoTicket = null;
      document.getElementById("recargar") ? document.getElementById("recargar").click() : null;
    }
  }

}
