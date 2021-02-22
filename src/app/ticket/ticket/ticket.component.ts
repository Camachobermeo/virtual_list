import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TiendaService } from 'src/app/admin/tienda/tienda.service';
import { TipoOperacionService } from 'src/app/admin/tipo-operacion/tipo-operacion.service';
import { Ticket } from 'src/app/entidades/Ticket';
import { UtilService } from 'src/app/servicios/util.service';

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
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.tiendaService.listarTiendas({}, this);
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
    if (this.tiendaSeleccionada) {
      this.listarTiposOperacion();
    }
  }

  listarTiposOperacion() {
    this.tiposService.listarTipos({ tienda: this.tiendaSeleccionada }, this);
  }

  despuesDeListarTipos(data) {
    this.tipos = data;
  }

  generarTicket(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      // let formaCobroCopia = JSON.parse(JSON.stringify(this.formaCobro));
      // this.setearValoresInvComprasFormaCobro(formaCobroCopia);
      // let parametro = { accion: 'I', carPagosCobrosFormaTO: formaCobroCopia };
      // this.formaCobroService.accionCarCobrosForma(parametro, this, LS.KEY_EMPRESA_SELECT);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

}
