import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiRequestService } from "./api-request.service";

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  fechaServidor: any;
  urlImpresoraMatricial: string = "http://localhost:9999/imprimir";

  constructor(
    public api: ApiRequestService,
    public toastr: ToastrService,
    private router: Router
  ) {
  }

  handleError(error: any, contexto) {
    switch (error.status) {
      case 401:
      case 403:
        this.toastr.warning('No autorizado', 'Aviso');
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['login']);
        break;
      case 404:
        this.toastr.warning('página solicitada no se encuentra', 'Aviso');
        break;
      case 0:
        this.toastr.warning("No hay conexión con el servidor.", 'Aviso');
        break;
      default:
        this.toastr.error(error.message || error, 'Error');
        break;
    }
    contexto.cargando = false;
  }


}
