import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/admin/sucursal/sucursal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  sucursales: any = new Array();
  cargando: boolean = false;

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
  }

  seleccionarSucursal(sucursal) {
    localStorage.setItem("sucursal", JSON.stringify(sucursal));
  }

}
