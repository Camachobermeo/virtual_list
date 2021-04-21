import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';
import { SucursalService } from '../../sucursal/sucursal.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.css']
})
export class UsuarioFormularioComponent implements OnInit {

  sucursales: any = new Array();
  usuario: Usuario = new Usuario();
  sucursalSeleccionada: string = "";
  cargando: boolean = false;
  esEdicion: boolean = false;

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    public sucursalService: SucursalService,
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usuario.username = this.route.snapshot.paramMap.get("codigo");
    this.sucursalService.listarSucursales({}, this);
    if (this.usuario.username) {
      this.esEdicion = true;
      this.obtenerUsuario();
    }
  }

  obtenerUsuario() {
    this.cargando = true;
    this.usuarioService.obtenerUsuario({ username: this.usuario.username }, this);
  }

  despuesDeListarSucursales(data) {
    this.sucursales = data;
    this.usuario.codigo_sucursal = this.sucursalSeleccionada || (this.sucursales[0] && this.sucursales[0].codigo);
  }

  despuesDeObtenerUsuario(data) {
    this.usuario = data;
    this.cargando = false;
  }



  guardarUsuario(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.usuario.rut_empresa = environment.empresa;
      if (this.esEdicion) {
        this.usuario['esEdicion'] = true;
      }else {
        this.usuario['esEdicion'] = false;
      }
      this.usuarioService.guardarUsuario(this.usuario, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarUsuario(data) {
    this.toastr.success(data.mensaje, "Aviso");
    this.router.navigate(['admin/usuario']);
    this.cargando = false;

  }

  visualizar(){
    if(document.getElementById("clave")){
      document.getElementById("clave")['type'] = "text";
      document.getElementById("clave")['id']= "oculto";
      document.getElementById("abierto").hidden=true;
      document.getElementById("cerrado").hidden=false;
    }else{
      document.getElementById("oculto")['type'] = "password";
      document.getElementById("oculto")['id']= "clave";
      document.getElementById("abierto").hidden=false;
      document.getElementById("cerrado").hidden=true;
    }
    
  }

}
