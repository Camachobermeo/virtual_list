import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  listarTiendas(parametro, contexto) {
    this.api.post("tienda.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarTiendas(respuesta.resultado);
        } else {
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  guardarTienda(parametro, contexto) {
    this.api.post("guardarTienda.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeGuardarTienda(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  obtenerTienda(parametro, contexto) {
    this.api.post("obtenerTienda.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeObtenerTienda(respuesta.resultado);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  eliminarTienda(parametro, contexto) {
    this.api.post("eliminar.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeEliminarTienda(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }
}
