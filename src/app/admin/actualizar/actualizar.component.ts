import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tienda } from 'src/app/entidades/Tienda';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { ListadoTicketsService } from '../listado-tickets/listado-tickets.service';
import { TiendaService } from '../tienda/tienda.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  tickets: any = new Array();
  usuario: Usuario = new Usuario();
  cargando: boolean = false;
  fecha_sacado: Date = null;
  ticketSeleccionado: any;
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
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.tiendaSeleccionada = this.usuario.codigo_tienda;
    this.tiendaService.listarTiendas({}, this);
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

  despuesDeListarTickets(data) {
    this.tickets = data;
    this.ticketSeleccionado = this.tickets[0].codigo_tipo_operacion + "-" + this.tickets[0].numeracion;
    this.cargando = false;
  }

}
