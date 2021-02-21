import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class TipoOperacionService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService
  ) { }
  listarTipos(parametro, contexto) {
    this.api.post("tipo-operacion.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarTipos(respuesta.resultado);
        } else {
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }
}
