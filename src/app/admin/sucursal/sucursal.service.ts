import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  listarSucursales(parametro, contexto) {
    this.api.postSinLogin("sucursal.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarSucursales(respuesta.resultado);
        } else {
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  guardarSucursal(parametro, contexto) {
    this.api.post("guardarSucursal.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeGuardarSucursal(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  obtenerSucursal(parametro, contexto) {
    this.api.post("obtenerSucursal.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeObtenerSucursal(respuesta.resultado);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  eliminarSucursal(parametro, contexto) {
    this.api.post("eliminar.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeEliminarSucursal(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }
}
