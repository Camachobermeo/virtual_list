import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TiendaService } from 'src/app/admin/tienda/tienda.service';
import { TipoOperacionService } from 'src/app/admin/tipo-operacion/tipo-operacion.service';
import { Ticket } from 'src/app/entidades/Ticket';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  tiendas: any = new Array();
  tipos: any = new Array();
  tiendaSeleccionada: string = "";
  tipoSeleccionado: string = "";
  ticket: Ticket = new Ticket();
  cargando: boolean = false;

  constructor(
    public tiendaService: TiendaService,
    public tiposService: TipoOperacionService,
    public utilService: UtilService,
    public toastr: ToastrService,
    public ticketService: TicketService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.cargando = true;
    this.tiendaService.listarTiendas({}, this);
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
    this.cargando = false;
    if (this.tiendaSeleccionada) {
      this.listarTiposOperacion();
    }
  }

  listarTiposOperacion() {
    this.cargando = true;
    this.tiposService.listarTipos({ tienda: this.tiendaSeleccionada }, this);
  }

  despuesDeListarTipos(data) {
    this.cargando = false;
    this.tipos = data;
  }

  generarTicket(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.ticketService.generarTicket(this.ticket, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGenerarTicket(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    this.ticket = new Ticket();
  }

}
