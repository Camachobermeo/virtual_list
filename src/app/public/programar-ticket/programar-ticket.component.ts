import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoOperacionService } from 'src/app/admin/tipo-operacion/tipo-operacion.service';
import { TicketProgramado } from 'src/app/entidades/TicketProgramado';
import { Tienda } from 'src/app/entidades/Tienda';
import { TipoOperacion } from 'src/app/entidades/TipoOperacion';
import { UtilService } from 'src/app/servicios/util.service';
import { TicketService } from '../ticket/ticket.service';

@Component({
  selector: 'app-programar-ticket',
  templateUrl: './programar-ticket.component.html',
  styleUrls: ['./programar-ticket.component.css']
})
export class ProgramarTicketComponent implements OnInit {

  ticket: TicketProgramado = new TicketProgramado();
  tiendaSeleccionada: string = "";
  tienda: Tienda = new Tienda();
  tipo: string = "";
  horaSeleccionada: string = "";
  cargando: boolean = false;
  horas: Array<string> = new Array();
  tipoOperacion: TipoOperacion = new TipoOperacion();

  constructor(
    private route: ActivatedRoute,
    public tipoOperacionService: TipoOperacionService,
    public toastr: ToastrService,
    public ticketService: TicketService,
    public utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.tiendaSeleccionada = this.route.snapshot.paramMap.get('tienda');
    this.tienda = new Tienda(JSON.parse(localStorage.getItem("tienda")));
    this.route
      .queryParams
      .subscribe(params => {
        this.ticket = new TicketProgramado(JSON.parse(params['ticket']));
      });
    this.tipoOperacionService.obtenerTipoOperacion({ codigo: this.tipo }, this);
  }

  horaEnSegundos(q) {
    return q * 60 * 60;
  }

  minutosEnSegundos(q) {
    return q * 60;
  }

  establecerHoras() {
    let hora = 3600;
    this.horas = new Array();
    let horaInicio: any = this.horaEnSegundos(8);
    let horaFin = this.horaEnSegundos(13);
    let progresion = this.minutosEnSegundos(15);
    while (horaInicio < horaFin) {
      horaInicio = horaInicio + progresion;
      hora = parseInt((horaInicio / 3600) + "") % 24;
      var minutos = parseInt((horaInicio / 60) + "") % 60;
      var resultado = (hora < 10 ? "0" + hora : hora) + ":" + (minutos < 10 ? "0" + minutos : minutos);
      this.horas.push(resultado);
    }
  }

  despuesDeObtenerTipoOperacion(data) {
    this.tipoOperacion = data;
    this.cargando = false;
    this.establecerHoras();
  }

  sacarCita(form: NgForm, hora) {
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.ticket.codigo_tipo_operacion = this.tipo;
      this.ticket.hora_cita = hora;
      this.horaSeleccionada = hora;
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
    }
  }

  programarTicket() {
    this.cargando = true;
    this.ticketService.generarTicketProgramado(this.ticket, this);
  }

  despuesDeGenerarTicketProgramado(){
    this.cargando = true;
    this.router.navigate(["/"]);
  }

}
