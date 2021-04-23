import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  generarTicket(parametro, contexto) {
    this.api.postSinLogin("ticket.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeGenerarTicket(respuesta);
        } else {
          contexto.cargando = false;
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  generarTicketProgramado(parametro, contexto) {
    this.api.postSinLogin("ticketProgramado.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeGenerarTicketProgramado(respuesta);
        } else {
          contexto.cargando = false;
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  obtenerTicketEnAtencion(parametro, contexto) {
    this.api.postSinLogin("obtenerTicketActual.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.estado) {
          contexto.despuesDeObtenerTicketEnAtencion(respuesta.resultado);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  obtenerTicketSacado(parametro, contexto) {
    this.api.postSinLogin("obtenerTicketActual.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.estado) {
          contexto.despuesDeObtenerTicketSacado(respuesta.resultado);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  anularProgramado(parametro, contexto) {
    this.api.post("anularProgramado.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeAnularProgramado(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  atenciones(parametro, contexto) {
    this.api.post("atenciones.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarAtenciones(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

}
