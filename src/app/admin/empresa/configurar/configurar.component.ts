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
  coloresDurosMenu: Array<string> = new Array();
  coloresCombinadosMenu: Array<string> = new Array();

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
      "bg-primary header-text-light",
      "bg-secondary header-text-light",
      "bg-success header-text-dark",
      "bg-info header-text-dark",
      "bg-warning header-text-dark",
      "bg-danger header-text-light",
      "bg-light header-text-dark",
      "bg-dark header-text-light",
      "bg-focus header-text-light",
      "bg-alternate header-text-light"
    ];
    this.coloresCombinados = [
      "bg-vicious-stance header-text-light",
      "bg-midnight-bloom header-text-light",
      "bg-night-sky header-text-light",
      "bg-slick-carbon header-text-light",
      "bg-asteroid header-text-light",
      "bg-royal header-text-light",
      "bg-warm-flame header-text-dark",
      "bg-night-fade header-text-dark",
      "bg-sunny-morning header-text-dark",
      "bg-tempting-azure header-text-dark",
      "bg-amy-crisp header-text-dark",
      "bg-heavy-rain header-text-dark",
      "bg-mean-fruit header-text-dark",
      "bg-malibu-beach header-text-light",
      "bg-deep-blue header-text-dark",
      "bg-ripe-malin header-text-light",
      "bg-arielle-smile header-text-light",
      "bg-plum-plate header-text-light",
      "bg-happy-fisher header-text-dark",
      "bg-happy-itmeo header-text-light",
      "bg-mixed-hopes header-text-light",
      "bg-strong-bliss header-text-light",
      "bg-grow-early header-text-light",
      "bg-love-kiss header-text-light",
      "bg-premium-dark header-text-light",
      "bg-happy-green header-text-light"
    ];
    this.coloresDurosMenu = [
      "bg-primary sidebar-text-light",
      "bg-secondary sidebar-text-light",
      "bg-success sidebar-text-dark",
      "bg-info sidebar-text-dark",
      "bg-warning sidebar-text-dark",
      "bg-danger sidebar-text-light",
      "bg-light sidebar-text-dark",
      "bg-dark sidebar-text-light",
      "bg-focus sidebar-text-light",
      "bg-alternate sidebar-text-light"
    ];
    this.coloresCombinadosMenu = [
      "bg-vicious-stance sidebar-text-light",
      "bg-midnight-bloom sidebar-text-light",
      "bg-night-sky sidebar-text-light",
      "bg-slick-carbon sidebar-text-light",
      "bg-asteroid sidebar-text-light",
      "bg-royal sidebar-text-light",
      "bg-warm-flame sidebar-text-dark",
      "bg-night-fade sidebar-text-dark",
      "bg-sunny-morning sidebar-text-dark",
      "bg-tempting-azure sidebar-text-dark",
      "bg-amy-crisp sidebar-text-dark",
      "bg-heavy-rain sidebar-text-dark",
      "bg-mean-fruit sidebar-text-dark",
      "bg-malibu-beach sidebar-text-light",
      "bg-deep-blue sidebar-text-dark",
      "bg-ripe-malin sidebar-text-light",
      "bg-arielle-smile sidebar-text-light",
      "bg-plum-plate sidebar-text-light",
      "bg-happy-fisher sidebar-text-dark",
      "bg-happy-itmeo sidebar-text-light",
      "bg-mixed-hopes sidebar-text-light",
      "bg-strong-bliss sidebar-text-light",
      "bg-grow-early sidebar-text-light",
      "bg-love-kiss sidebar-text-light",
      "bg-premium-dark sidebar-text-light",
      "bg-happy-green sidebar-text-light"
    ];
  }

  obtenerEmpresa() {
    this.cargando = true;
    this.empresaService.obtenerEmpresa({}, this);
  }

  despuesDeObtenerEmpresa(data) {
    this.empresa = data;
    this.archivoPerfilByte = data.logo || "assets/images/logo-inverse.png";
    if (this.empresa.cabecera) {
      let clases = this.empresa.cabecera.split(" ");
      if (clases) {
        document.getElementById(clases[0] + "-" + clases[1]).classList.add("active");
      }
    }
    if (this.empresa.menu) {
      let clases = this.empresa.menu.split(" ");
      if (clases) {
        document.getElementById(clases[0] + "-" + clases[1] + "-menu").classList.add("active");
      }
    }
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
    location.reload();
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

  elegirColor($event, estilos) {
    this.quitarColor();
    $event.target.classList.add('active');
    let clases = estilos.split(" ");
    if (clases) {
      this.empresa.cabecera = estilos;
      document.getElementById("cabecera").classList.add(clases[0]);
      document.getElementById("cabecera").classList.add(clases[1]);
    }
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

  elegirColorMenu($event, estilos) {
    this.quitarColorMenu();
    $event.target.classList.add('active');
    let clases = estilos.split(" ");
    if (clases) {
      this.empresa.menu = estilos;
      document.getElementById("lista-menu").classList.add(clases[0]);
      document.getElementById("lista-menu").classList.add(clases[1]);
    }
  }

  quitarColorMenu() {
    let menu = this.empresa.menu;
    if (menu) {
      let clases = menu.split(" ");
      if (clases) {
        document.getElementById(clases[0] + "-" + clases[1] + "-menu").classList.remove("active");
        document.getElementById("lista-menu").classList.remove(clases[0]);
        document.getElementById("lista-menu").classList.remove(clases[1]);
      }
    }
    this.empresa.menu = null;
  }

}
