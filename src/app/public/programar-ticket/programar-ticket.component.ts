import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilaService } from 'src/app/admin/fila/fila.service';
import { TicketProgramado } from 'src/app/entidades/TicketProgramado';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { Fila } from 'src/app/entidades/Fila';
import { UtilService } from 'src/app/servicios/util.service';
import { TicketService } from '../ticket/ticket.service';
import { Empresa } from 'src/app/entidades/Empresa';

@Component({
  selector: 'app-programar-ticket',
  templateUrl: './programar-ticket.component.html',
  styleUrls: ['./programar-ticket.component.css']
})
export class ProgramarTicketComponent implements OnInit {

  ticket: TicketProgramado = new TicketProgramado();
  sucursalSeleccionada: string = "";
  sucursal: Sucursal = new Sucursal();
  filaCodigo: string = "";
  horaSeleccionada: string = "";
  secuencial: number = 0;
  numeracion: number = 0;
  cargando: boolean = false;
  generado: boolean = false;
  horas: Array<string> = new Array();
  fila: Fila = new Fila();
  fechaActual = new Date();
  empresa: Empresa = new Empresa();
  color: any = 'text-light';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public filaService: FilaService,
    public toastr: ToastrService,
    public ticketService: TicketService,
    public utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.filaCodigo = this.route.snapshot.paramMap.get('fila');
    this.sucursalSeleccionada = this.route.snapshot.paramMap.get('sucursal');
    this.sucursal = new Sucursal(JSON.parse(localStorage.getItem("sucursal")));
    this.route
      .queryParams
      .subscribe(params => {
        this.ticket = new TicketProgramado(JSON.parse(params['ticket']));
      });
    this.filaService.obtenerFila({ codigo: this.filaCodigo }, this);
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
    let progresion = this.minutosEnSegundos(this.fila.tiempo_estimado_minutos);

    hora = parseInt((horaInicio / 3600) + "") % 24;
    var minutos = parseInt((horaInicio / 60) + "") % 60;
    var resultado = (hora < 10 ? "0" + hora : hora) + ":" + (minutos < 10 ? "0" + minutos : minutos);
    this.horas.push(resultado);

    while (horaInicio < horaFin) {
      horaInicio = horaInicio + progresion;
      hora = parseInt((horaInicio / 3600) + "") % 24;
      var minutos = parseInt((horaInicio / 60) + "") % 60;
      var resultado = (hora < 10 ? "0" + hora : hora) + ":" + (minutos < 10 ? "0" + minutos : minutos);
      this.horas.push(resultado);
    }
  }

  despuesDeObtenerFila(data) {
    this.fila = data;
    this.cargando = false;
    setTimeout(() => {
      this.empresa = JSON.parse(localStorage.getItem("entidadEmpresa"));
      this.color = this.utilService.establecerColor(this.empresa.cabecera);
    }, 50);
    this.establecerHoras();
  }

  sacarCita(form: NgForm, hora) {
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.ticket.codigo_fila = this.filaCodigo;
      this.ticket.hora_cita = hora;
      this.horaSeleccionada = hora;
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
    }
  }

  programarTicket() {
    this.cargando = true;
    this.ticket['sucursal'] = this.sucursal.direccion;
    this.ticket['fila'] = this.fila.descripcion;
    this.ticketService.generarTicketProgramado(this.ticket, this);
  }

  despuesDeGenerarTicketProgramado(data) {
    this.cargando = false;
    this.secuencial = data.resultado && data.resultado.secuencial;
    this.numeracion = data.resultado && data.resultado.numeracion;
    this.toastr.success(data.mensaje, "Aviso");
    this.generado = true;
  }

  anularProgramado() {
    this.cargando = true;
    this.ticketService.anularProgramado({ secuencial: this.secuencial }, this);
  }

  despuesDeAnularProgramado(data) {
    this.cargando = false;
    this.toastr.success(data.mensaje, "Aviso");
    this.router.navigate(['/']);
  }

  printer() {
    let printContent = "<html><head><title></title><link rel='stylesheet' href='assets/main.css' type='text/css' /></head><body >";
    printContent = printContent + document.getElementById("print").innerHTML;
    printContent = printContent + "</body></html>";
    const WindowPrt = window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent);
    WindowPrt.document.close();
    WindowPrt.focus();
    setTimeout(function () { WindowPrt.print(); WindowPrt.close(); }, 1000);
  }

}
