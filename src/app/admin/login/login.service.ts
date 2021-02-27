import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  obtenerLogin(parametro, contexto) {
    this.api.post("login.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeObtenerLogin(respuesta);
        } else {
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
          contexto.cargando=false;
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }

}
