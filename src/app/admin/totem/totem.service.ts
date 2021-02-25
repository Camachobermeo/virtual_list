import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class TotemService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  listarTotems(parametro, contexto) {
    this.api.post("totem.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarTotems(respuesta.resultado);
        } else {
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  guardarTotem(parametro, contexto) {
    this.api.post("guardarTotem.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeGuardarTotem(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  obtenerTotem(parametro, contexto) {
    this.api.post("obtenerTotem.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeObtenerTotem(respuesta.resultado);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

}
