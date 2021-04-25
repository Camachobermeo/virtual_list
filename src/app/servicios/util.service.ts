import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
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

  establecerFormularioTocado(form: NgForm): boolean {
    let touched = true;
    let formControls = form.form.controls;
    for (let element in formControls) {
      form.controls[element].markAsTouched();
      form.controls[element].updateValueAndValidity();
    }
    return touched;
  }

  establecerColor(cabecera): string {
    if (cabecera) {
      let clases = cabecera.split(" ");
      if (clases) {
        if (clases[1] == 'header-text-dark') {
          return 'text-dark';
        }
      }
      return 'text-light';
    } else {
      return 'text-dark';
    }
  }


}
