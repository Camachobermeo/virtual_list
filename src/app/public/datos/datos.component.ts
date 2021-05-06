import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilaService } from 'src/app/admin/fila/fila.service';
import { Ticket } from 'src/app/entidades/Ticket';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { Fila } from 'src/app/entidades/Fila';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';
import { TicketService } from '../ticket/ticket.service';
import { Empresa } from 'src/app/entidades/Empresa';
import { EmpresaService } from 'src/app/admin/empresa/empresa.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  ticket: Ticket = new Ticket();
  empresa: Empresa = new Empresa();
  ticketAtencion: Ticket = new Ticket();
  cargando: boolean = false;
  generado: boolean = false;
  numeroValido: boolean = false;
  sucursalSeleccionada: string = "";
  sucursal: Sucursal = new Sucursal();
  filaCodigo: string = "";
  enFila: number = 0;
  tiempoEnFila: number = 0;
  fila: Fila = new Fila();
  color: any = 'text-light';

  constructor(
    public utilService: UtilService,
    public empresaService: EmpresaService,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    public ticketService: TicketService,
    private router: Router,
    public filaService: FilaService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.empresa.obligar_correo = true;
    this.obtenerEmpresa();
    this.cargando = true;
    this.filaCodigo = this.route.snapshot.paramMap.get('fila');
    this.sucursalSeleccionada = this.route.snapshot.paramMap.get('sucursal');
    this.sucursal = new Sucursal(JSON.parse(localStorage.getItem("sucursal")));
    this.filaService.obtenerFila({ codigo: this.filaCodigo }, this);
    this.ticketService.obtenerTicketEnAtencion({ codigo: this.filaCodigo, estado: 'EN ATENCION' }, this);//en atencion
  }

  obtenerEmpresa() {
    this.empresaService.obtenerEmpresa({}, this);
  }

  despuesDeObtenerEmpresa(data) {
    this.empresa = data;
    this.empresa.obligar_correo = true;
    this.color = this.utilService.establecerColor(this.empresa.cabecera);
  }

  despuesDeObtenerFila(data) {
    this.fila = data;
  }

  despuesDeObtenerTicketEnAtencion(data) {
    this.ticketAtencion = data || new Ticket();
    this.ticketService.obtenerTicketSacado({ codigo: this.filaCodigo, estado: null }, this);//atendido
  }

  despuesDeObtenerTicketSacado(data) {
    let ultimoAtencion = this.ticketAtencion.numeracion;
    if (data) {
      let ultimoSacado = data && data.numeracion;
      this.enFila = (ultimoSacado || 0) - (ultimoAtencion || 0);
      this.enFila = Math.abs(this.enFila);
      if (this.fila.cantidad_ventanillas && this.fila.cantidad_ventanillas <= this.enFila) {
        this.tiempoEnFila = this.enFila * this.fila.tiempo_estimado_minutos / this.fila.cantidad_ventanillas;
      } else {
        this.tiempoEnFila = 0;
      }
    }
    this.cargando = false;
  }

  generarTicket(form: NgForm) {
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      if (this.empresa.obligar_celular) {
        if (this.numeroValido && this.ticket.telefono) {
          this.puedeGenerar();
        } else {
          this.toastr.warning("El número de teléfono no es válido.", "Aviso");
        }
      } else {
        this.puedeGenerar();
      }
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
    }
  }

  puedeGenerar() {
    this.cargando = true;
    this.ticket.codigo_fila = this.filaCodigo;
    this.ticket['sucursal'] = this.sucursal.direccion;
    this.ticket['fila'] = this.fila.descripcion;
    this.ticket['url'] = location.href;
    this.ticket['minutos'] = this.tiempoEnFila;
    this.ticketService.generarTicket(this.ticket, this);
  }

  programarTicket(form: NgForm) {
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      if (this.empresa.obligar_celular) {
        if (this.numeroValido && this.ticket.telefono) {
          this.puedeProgramar();
        } else {
          this.toastr.warning("El número de télefono no es válido.", "Aviso");
        }
      } else {
        this.puedeProgramar();
      }
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
    }
  }

  puedeProgramar() {
    this.cargando = true;
    this.ticket.codigo_fila = this.filaCodigo;
    this.ticket['url'] = location.href;
    this.ticket['minutos'] = this.tiempoEnFila;
    this.router.navigate(["programar/" + this.sucursalSeleccionada + "/" + this.filaCodigo], { queryParams: { ticket: JSON.stringify(this.ticket) } });
  }

  despuesDeGenerarTicket(data) {
    this.cargando = false;
    this.generado = true;
    this.toastr.success(data.mensaje, "Aviso");
    this.ticket.numeracion = data.resultado && data.resultado.numeracion;
    this.ticket.fecha_sacado = data.resultado && data.resultado.fecha_sacado;
    this.ticketService.obtenerTicketEnAtencion({ codigo: this.filaCodigo, estado: 'EN ATENCION' }, this);//en atencion
  }

  refrescar() {
    this.cargando = true;
    this.ticketService.obtenerTicketEnAtencion({ codigo: this.filaCodigo, estado: 'EN ATENCION' }, this);//en atencion
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

  //#region [Telefono]
  hasError(event) {
    this.numeroValido = event;
  }

  getNumber(event) {
    this.ticket.telefono = event;
  }
  //#endregion

}
