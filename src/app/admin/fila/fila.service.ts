import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class FilaService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  listarFilas(parametro, contexto) {
    this.api.postSinLogin("fila.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarFilas(respuesta.resultado);
        } else {
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  guardarFila(parametro, contexto) {
    this.api.post("guardarFila.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeGuardarFila(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  obtenerFila(parametro, contexto) {
    this.api.postSinLogin("obtenerFila.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeObtenerFila(respuesta.resultado);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  eliminarFila(parametro, contexto) {
    this.api.post("eliminar.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeEliminarFila(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando = false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

}
