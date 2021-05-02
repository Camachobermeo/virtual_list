import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class ListadoTicketsService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService
  ) { }

  listarTickets(parametro, contexto) {
    this.api.postSinLogin("listarTickets.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarTickets(respuesta.resultado);
        } else {
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  cambiarEstadoTicket(parametro, estado, contexto) {
    this.api.post("cambiarEstadoTicket.php", parametro)
      .then(respuesta => {
        if (respuesta && (respuesta.resultado || respuesta.objeto)) {
          contexto.despuesDeCambiarEstadoTicket(respuesta, estado);
        } else {
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  cambiarEstadoTicketProgramado(parametro, estado, contexto) {
    this.api.post("cambiarEstadoTicketProgramado.php", parametro)
      .then(respuesta => {
        if (respuesta && (respuesta.resultado || respuesta.objeto)) {
          contexto.despuesDeCambiarEstadoTicket(respuesta, estado);
        } else {
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

}
