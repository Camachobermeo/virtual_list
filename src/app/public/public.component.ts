import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpresaService } from '../admin/empresa/empresa.service';
import { Empresa } from '../entidades/Empresa';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  empresa: Empresa = new Empresa();
  cargando: boolean = false;
  public archivoPerfilByte: any = null;
  
  constructor(
    public empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    localStorage.setItem("empresa", environment.empresa);
    this.cargando = true;
    this.empresaService.obtenerEmpresa({}, this);
  }

  despuesDeObtenerEmpresa(data) {
    this.empresa = data;
    this.archivoPerfilByte = data.logo || "assets/images/logo-inverse.png";
    this.cargando = false;
  }

}
