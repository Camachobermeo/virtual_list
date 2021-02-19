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

  listarInvListaBancosTO(parametro, contexto, porDefecto, empresaSelect) {
    this.api.post("todocompuWS/bancoWebController/getListaBanBancoTO", parametro, empresaSelect)
      .then(respuesta => {
        if (respuesta && respuesta.extraInfo) {
          contexto.despuesDeListarInvListaBancosTO(respuesta.extraInfo, porDefecto);
        } else {
          contexto.despuesDeListarInvListaBancosTO([], porDefecto, respuesta.operacionMensaje);
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

}
