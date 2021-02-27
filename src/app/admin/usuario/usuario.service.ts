import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  listarUsuarios(parametro, contexto) {
    this.api.post("usuario.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeListarUsuarios(respuesta.resultado);
        } else {
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  guardarUsuario(parametro, contexto) {
    this.api.post("guardarUsuario.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeGuardarUsuario(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  obtenerUsuario(parametro, contexto) {
    this.api.post("obtenerUsuario.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeObtenerUsuario(respuesta.resultado);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

  eliminarUsuario(parametro, contexto) {
    this.api.post("eliminar.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeEliminarUsuario(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

}
