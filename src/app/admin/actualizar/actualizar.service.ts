import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService
  ) { }

  obtenerTicketLibreOEnAtencion(parametro, contexto) {
    this.api.post("obtenerTicketLibreOEnAtencion.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeObtenerTicketLibreOEnAtencion(respuesta.resultado);
        } else {
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }
}
