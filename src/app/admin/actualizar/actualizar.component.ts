import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/entidades/Ticket';
import { Tienda } from 'src/app/entidades/Tienda';
import { TipoOperacion } from 'src/app/entidades/TipoOperacion';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { ListadoTicketsService } from '../listado-tickets/listado-tickets.service';
import { TiendaService } from '../tienda/tienda.service';
import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
import { ActualizarService } from './actualizar.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  ticketSeleccionado: Ticket = new Ticket();
  ultimoTicket: Ticket = new Ticket();
  nombreTicket: any = null;

  tipos: Array<TipoOperacion> = new Array();
  tipoSeleccionado: any = null;
  usuario: Usuario = new Usuario();
  cargando: boolean = false;
  fecha_sacado: any = null;
  tiendas: Array<Tienda> = new Array();
  tiendaSeleccionada: any = null;

  constructor(
    public actualizarService: ActualizarService,
    public tiendaService: TiendaService,
    public utilService: UtilService,
    public toastr: ToastrService,
    public tipoService: TipoOperacionService,
    public ticketsService: ListadoTicketsService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.fecha_sacado = new Date().getFullYear() + "-" + (new Date().getMonth() >= 10 ? "" : "0") + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.tiendaSeleccionada = this.usuario.codigo_tienda;
    this.tiendaService.listarTiendas({}, this);
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
      this.actualizarService.obtenerTicketLibreOEnAtencion(
        { fecha_sacado: this.fecha_sacado, sucursal: this.tiendaSeleccionada, tipo: this.tipoSeleccionado, usuario: this.usuario.codigo },
        this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeObtenerTicketLibreOEnAtencion(data) {
    this.ticketSeleccionado = data[0];
    this.nombreTicket = this.ticketSeleccionado ? this.ticketSeleccionado.codigo_tipo_operacion + "-" + this.ticketSeleccionado.numeracion : null;
    this.cargando = false;
  }

  atender(texto) {
    if (this.ticketSeleccionado) {
      if (texto == 'ATENDIDO' && !this.ticketSeleccionado.estado) {
        this.toastr.warning("Debe iniciar atención del ticket mostrado en pantalla.", "Aviso");
      } else {
        this.ultimoTicket = this.ticketSeleccionado;
        this.cargando = true;
        this.ticketsService.cambiarEstadoTicket(
          { secuencial: this.ticketSeleccionado.secuencial, estado: texto, usuario: this.usuario.codigo },
          texto, this);
      }
    } else {
      this.toastr.warning("No existe un ticket por atender.", "Aviso");
    }
  }

  retroceder() {
    if (this.ultimoTicket) {
      this.cargando = true;
      this.ticketsService.cambiarEstadoTicket(
        { secuencial: this.ultimoTicket.secuencial, estado: null, usuario: this.usuario.codigo },
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
      this.ticketSeleccionado.usuario = this.usuario.codigo;
      if (estado == 'ATENDIDO') {
        document.getElementById("recargar") ? document.getElementById("recargar").click() : null;
      }
    } else {
      this.ultimoTicket = null;
      document.getElementById("recargar") ? document.getElementById("recargar").click() : null;
    }
  }

}
