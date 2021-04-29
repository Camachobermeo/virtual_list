import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilaService } from 'src/app/admin/fila/fila.service';
import { Empresa } from 'src/app/entidades/Empresa';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { Ticket } from 'src/app/entidades/Ticket';
import { ApiRequestService } from 'src/app/servicios/api-request.service';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fila-ticket',
  templateUrl: './fila-ticket.component.html'
})
export class FilaTicketComponent implements OnInit {

  filas: any = new Array();
  sucursalSeleccionada: string = "";
  cargando: boolean = false;
  sucursal: Sucursal = new Sucursal();
  elementType = 'url';
  value = location.href;
  empresa: Empresa = new Empresa();
  color: any = 'text-light';

  constructor(
    public filasService: FilaService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private api: ApiRequestService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.sucursalSeleccionada = this.route.snapshot.paramMap.get('sucursal');
    this.sucursal = new Sucursal(JSON.parse(localStorage.getItem("sucursal")));
    this.cargando = true;
    this.Filas();
  }

  Filas() {
    this.cargando = true;
    this.filasService.listarFilas({ sucursal: this.sucursalSeleccionada }, this);
  }

  despuesDeListarFilas(data) {
    this.cargando = false;
    this.filas = data;

    if (this.filas) {
      this.filas.forEach(element => {
        let tiempoEnFila = 0;
        this.api.postSinLogin("obtenerTicketActual.php", { codigo: element.codigo, estado: 'EN ATENCION' })
          .then(respuesta => {
            if (respuesta && respuesta.estado) {

              let ticketAtencion = respuesta.resultado || new Ticket();
              element.ticketAtencion = ticketAtencion;

              this.api.postSinLogin("obtenerTicketActual.php", { codigo: element.codigo, estado: null })
                .then(respuesta => {

                  if (respuesta && respuesta.estado) {
                    let ultimoAtencion = ticketAtencion.numeracion;
                    if (respuesta && respuesta.resultado) {
                      let ultimoSacado = respuesta.resultado.numeracion;
                      let enFila = (ultimoSacado || 0) - (ultimoAtencion || 0);
                      enFila = Math.abs(enFila);
                      element.enFila = enFila;
                      if (element.cantidad_ventanillas && element.cantidad_ventanillas <= enFila) {
                        tiempoEnFila = enFila * element.tiempo_estimado_minutos / element.cantidad_ventanillas;
                      }
                    }
                  }
                  element.tiempoEnFila = tiempoEnFila;
                }).catch(err => this.utilService.handleError(err, this));
            }
          }).catch(err => this.utilService.handleError(err, this));
      });
    }

    setTimeout(() => {
      this.empresa = JSON.parse(localStorage.getItem("entidadEmpresa"));
      this.color = this.utilService.establecerColor(this.empresa.cabecera);
    }, 50);
  }

}
