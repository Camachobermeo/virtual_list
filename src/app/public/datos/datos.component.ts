import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/entidades/Ticket';
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
  cargando: boolean = false;
  tiendaSeleccionada: string = "";
  tipo: string = "";

  constructor(
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    public ticketService: TicketService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.tiendaSeleccionada = this.route.snapshot.paramMap.get('tienda');
  }

  generarTicket(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.ticket.codigo_tipo_operacion = this.tipo;
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
