import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../entidades/Empresa';
import { Usuario } from '../entidades/Usuario';
import { EmpresaService } from './empresa/empresa.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  nombreUsuario = "";
  test = "";
  ocultarMenu = false;
  ocultarDatosUser = true;
  usuario: Usuario = new Usuario();
  empresa: Empresa = new Empresa();
  cargando: boolean = false;
  public archivoPerfilByte: any = null;

  constructor(
    private router: Router,
    public empresaService: EmpresaService
  ) {
  }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem("codigo");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.cargando = true;
    this.empresaService.obtenerEmpresa({}, this);
  }

  despuesDeObtenerEmpresa(data) {
    this.empresa = data;
    this.archivoPerfilByte = data.logo || "assets/images/logo-inverse.png";
    this.cargando = false;
  }

  salir() {
    let usuario = JSON.parse(localStorage.getItem("usuarioRecordar")) || new Usuario();
    localStorage.clear();
    localStorage.setItem("usuarioRecordar", JSON.stringify(usuario));
    this.router.navigate(['login']);
  }

  cerraNav() {
    this.ocultarMenu = !this.ocultarMenu;
    if (this.ocultarMenu) {
      document.getElementById("cuerpo").classList.add('closed-sidebar');
      document.getElementById("cuerpo").classList.add('sidebar-mobile-open');
      document.getElementById("menu").classList.add('is-active');
      document.getElementById("menuMovil").classList.add('is-active');
    } else {
      document.getElementById("cuerpo").classList.remove('closed-sidebar');
      document.getElementById("cuerpo").classList.remove('sidebar-mobile-open');
      document.getElementById("menu").classList.remove('is-active');
      document.getElementById("menuMovil").classList.remove('is-active');
    }
  }

  activarMovil() {
    this.ocultarDatosUser = !this.ocultarDatosUser;
    if (this.ocultarDatosUser) {
      document.getElementById("header-content").classList.remove('header-mobile-open');
    } else {
      document.getElementById("header-content").classList.add('header-mobile-open');
    }
  }

}
