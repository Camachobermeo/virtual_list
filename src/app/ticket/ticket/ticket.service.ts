import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private api: ApiRequestService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  generarTicket(parametro, contexto) {
    this.api.post("ticket.php", parametro)
      .then(respuesta => {
        if (respuesta && respuesta.resultado) {
          contexto.despuesDeGenerarTicket(respuesta);
        } else {
          contexto.cargando = false;
          this.toastr.error((respuesta && respuesta.mensaje) || "Error desconocido")
        }
      }).catch(err => this.utilService.handleError(err, contexto));
  }
}
