import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/entidades/Empresa';
import { UtilService } from 'src/app/servicios/util.service';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-configurar',
  templateUrl: './configurar.component.html',
  styleUrls: ['./configurar.component.css']
})
export class ConfigurarComponent implements OnInit {

  empresa: Empresa = new Empresa();
  cargando: boolean = false;
  public archivoPerfilByte: any = null;
  visualizarImagen: boolean = false;
  coloresDuros: Array<string> = new Array();
  coloresCombinados: Array<string> = new Array();

  constructor(
    private router: Router,
    public empresaService: EmpresaService,
    public utilService: UtilService,
    public toastr: ToastrService,
    private DomSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.obtenerEmpresa();
    this.coloresDuros = [
      "",
      "",
      "",
    ]
  }

  obtenerEmpresa() {
    this.cargando = true;
    this.empresaService.obtenerEmpresa({}, this);
  }

  despuesDeObtenerEmpresa(data) {
    this.empresa = data;
    this.archivoPerfilByte = data.logo || "assets/images/logo-inverse.png";
    this.cargando = false;
  }

  guardarEmpresa(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.empresa.logo = this.archivoPerfilByte ? this.archivoPerfilByte.split("base64,")[1] : null;
      this.empresaService.guardarEmpresa(this.empresa, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarEmpresa(data) {
    this.toastr.success(data.mensaje, "Aviso");
    this.cargando = false;
    this.router.navigate(['admin/empresa']);
  }

  seleccionarImagenes(event) {
    if (event && event.files) {
      for (let i = 0; i < event.files.length; i++) {
        this.convertirFiles(event.files[i]);
      }
    }
  }

  convertirFiles(file) {
    if (file.size <= 1000000) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader && reader.result) {
          this.archivoPerfilByte = reader.result;
        }
      }
    }
  }

  eliminarItem() {
    this.archivoPerfilByte = null;
  }

  elegirColor($event, clase1, clase2) {
    this.quitarColor();
    $event.target.classList.add('active');
    this.empresa.cabecera = clase1 + " " + clase2;
    document.getElementById("cabecera").classList.add(clase1);
    document.getElementById("cabecera").classList.add(clase2);
  }

  quitarColor() {
    let cabecera = this.empresa.cabecera;
    if (cabecera) {
      let clases = cabecera.split(" ");
      if (clases) {
        document.getElementById(clases[0] + "-" + clases[1]).classList.remove("active");
        document.getElementById("cabecera").classList.remove(clases[0]);
        document.getElementById("cabecera").classList.remove(clases[1]);
      }
    }
    this.empresa.cabecera = null;
  }

  elegirColorMenu($event, clase1, clase2) {
    this.quitarColor();
    $event.target.classList.add('active');
    this.empresa.cabecera = clase1 + " " + clase2;
    document.getElementById("cabecera").classList.add(clase1);
    document.getElementById("cabecera").classList.add(clase2);
  }

  quitarColorMenu() {
    let cabecera = this.empresa.cabecera;
    if (cabecera) {
      let clases = cabecera.split(" ");
      if (clases) {
        document.getElementById(clases[0] + "-" + clases[1]).classList.remove("active");
        document.getElementById("cabecera").classList.remove(clases[0]);
        document.getElementById("cabecera").classList.remove(clases[1]);
      }
    }
    this.empresa.cabecera = null;
  }

}
