import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class TotemService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService
  ) { }

  listarTotems(parametro, contexto, empresaSelect) {
    this.api.post("totem.php", parametro, empresaSelect)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarTotems(respuesta.extraInfo);
        } else {
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

}
