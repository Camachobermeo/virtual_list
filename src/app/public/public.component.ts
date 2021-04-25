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
  color: any = 'text-light';

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
    let clases = this.empresa.cabecera.split(" ");
    if (clases) {
      if (clases[1] == 'header-text-dark') {
        this.color = 'text-dark';
      }
    }
    this.archivoPerfilByte = data.logo || "assets/images/logo-inverse.png";
    localStorage.setItem("entidadEmpresa", JSON.stringify(this.empresa));
    this.cargando = false;
  }

}
