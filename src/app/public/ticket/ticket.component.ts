import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/admin/sucursal/sucursal.service';
import { Empresa } from 'src/app/entidades/Empresa';
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
    public sucursalService: SucursalService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.cargando = true;
    this.sucursalService.listarSucursales({}, this);
  }

  despuesDeListarSucursales(data) {
    this.sucursales = data;
    this.cargando = false;
    this.empresa = JSON.parse(localStorage.getItem("entidadEmpresa"));
    let clases = this.empresa.cabecera.split(" ");
    if (clases) {
      if (clases[1] == 'header-text-dark') {
        this.color = 'text-dark';
      }
    }
  }

  seleccionarSucursal(sucursal) {
    localStorage.setItem("sucursal", JSON.stringify(sucursal));
  }

}
