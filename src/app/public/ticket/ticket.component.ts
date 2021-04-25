import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/admin/sucursal/sucursal.service';
import { Empresa } from 'src/app/entidades/Empresa';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  sucursales: any = new Array();
  cargando: boolean = false;
  empresa: Empresa = new Empresa();
  color: any = 'text-light';

  constructor(
    public sucursalService: SucursalService,
    public utilService: UtilService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.cargando = true;
    this.sucursalService.listarSucursales({}, this);
  }

  despuesDeListarSucursales(data) {
    this.sucursales = data;
    this.cargando = false;
    setTimeout(() => {
      this.empresa = JSON.parse(localStorage.getItem("entidadEmpresa"));
      this.color = this.utilService.establecerColor(this.empresa.cabecera);
    }, 50);
  }

  seleccionarSucursal(sucursal) {
    localStorage.setItem("sucursal", JSON.stringify(sucursal));
  }

}
