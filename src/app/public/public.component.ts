import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpresaService } from '../admin/empresa/empresa.service';
import { Empresa } from '../entidades/Empresa';
import { UtilService } from '../servicios/util.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  empresa: Empresa = new Empresa();
  cargando: boolean = false;
  public archivoPerfilByte: any = null;
  color: any = 'text-light';

  constructor(
    public empresaService: EmpresaService,
    public utilService: UtilService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.cargando = true;
    this.empresaService.obtenerEmpresa({}, this);
  }

  despuesDeObtenerEmpresa(data) {
    this.empresa = data;
    this.color = this.utilService.establecerColor(this.empresa.cabecera);
    this.archivoPerfilByte = data.logo || "assets/images/logo-inverse.png";
    localStorage.setItem("entidadEmpresa", JSON.stringify(this.empresa));
    this.cargando = false;
  }

}
