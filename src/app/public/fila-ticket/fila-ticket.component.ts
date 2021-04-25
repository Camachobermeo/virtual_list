import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilaService } from 'src/app/admin/fila/fila.service';
import { Empresa } from 'src/app/entidades/Empresa';
import { Sucursal } from 'src/app/entidades/Sucursal';
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
    private utilService: UtilService
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
    setTimeout(() => {
      this.empresa = JSON.parse(localStorage.getItem("entidadEmpresa"));
      this.color = this.utilService.establecerColor(this.empresa.cabecera);
    }, 50);
  }

}
