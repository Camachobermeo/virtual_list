import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoOperacionService } from 'src/app/admin/tipo-operacion/tipo-operacion.service';
import { Ticket } from 'src/app/entidades/Ticket';
import { Tienda } from 'src/app/entidades/Tienda';
import { TipoOperacion } from 'src/app/entidades/TipoOperacion';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';
import { TicketService } from '../ticket/ticket.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  ticket: Ticket = new Ticket();
  ticketAtencion: Ticket = new Ticket();
  cargando: boolean = false;
  generado: boolean = false;
  tiendaSeleccionada: string = "";
  tienda: Tienda = new Tienda();
  tipo: string = "";
  enFila: number = 0;
  tipoOperacion: TipoOperacion = new TipoOperacion();

  constructor(
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    public ticketService: TicketService,
    private router: Router,
    public tipoOperacionService: TipoOperacionService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.cargando = true;
    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.tiendaSeleccionada = this.route.snapshot.paramMap.get('tienda');
    this.tienda = new Tienda(JSON.parse(localStorage.getItem("tienda")));
    this.tipoOperacionService.obtenerTipoOperacion({ codigo: this.tipo }, this);
    this.ticketService.obtenerTicketEnAtencion({ codigo: this.tipo, estado: 'EN ATENCION' }, this);//en atencion
    this.ticketService.obtenerTicketSacado({ codigo: this.tipo, estado: null }, this);//atendido
  }

  despuesDeObtenerTipoOperacion(data) {
    this.tipoOperacion = data;
  }

  despuesDeObtenerTicketEnAtencion(data) {
    this.ticketAtencion = data || new Ticket();
  }

  despuesDeObtenerTicketSacado(data) {
    // this.ticketAtencion = data || new Ticket();
    let ultimoAtencion = this.ticketAtencion.numeracion;
    if (data) {
      let ultimoSacado = data && data.numeracion;
      this.enFila = (ultimoSacado || 0) - (ultimoAtencion || 0);
      this.enFila = Math.abs(this.enFila);
    }
    this.cargando = false;
  }

  generarTicket(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.ticket.codigo_tipo_operacion = this.tipo;
      this.ticket['sucursal'] = this.tienda.direccion;
      this.ticket['fila'] = this.tipoOperacion.descripcion;
      this.ticketService.generarTicket(this.ticket, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  programarTicket(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.ticket.codigo_tipo_operacion = this.tipo;
      this.router.navigate(["programar/" + this.tiendaSeleccionada + "/" + this.tipo], { queryParams: { ticket: JSON.stringify(this.ticket) } });
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGenerarTicket(data) {
    this.cargando = false;
    this.generado = true;
    this.toastr.success(data.mensaje, "Aviso");
    this.ticket.numeracion = data.resultado && data.resultado.numeracion;
    this.ticket.fecha_sacado = data.resultado && data.resultado.fecha_sacado;
    this.ticketService.obtenerTicketEnAtencion({ codigo: this.tipo, estado: 'EN ATENCION' }, this);//en atencion
    this.ticketService.obtenerTicketSacado({ codigo: this.tipo, estado: null }, this);//atendido
  }

  refrescar() {
    this.cargando = true;
    this.ticketService.obtenerTicketEnAtencion({ codigo: this.tipo, estado: 'EN ATENCION' }, this);//en atencion
    this.ticketService.obtenerTicketSacado({ codigo: this.tipo, estado: null }, this);//atendido
  }

  printer() {
    let printContent = "<html><head><title></title><link rel='stylesheet' href='assets/main.css' type='text/css' /></head><body >";
    printContent = printContent + document.getElementById("print").innerHTML;
    printContent = printContent + "</body></html>";
    const WindowPrt = window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent);
    WindowPrt.document.close();
    WindowPrt.focus();
    setTimeout(function () { WindowPrt.print(); WindowPrt.close();}, 1000);
  }

}
