import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService
  ) { }
  listarTiendas(parametro, contexto) {
    this.api.post("tienda.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarTiendas(respuesta.resultado);
        } else {
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }
}
