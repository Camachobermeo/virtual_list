import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/entidades/Usuario';
import { UtilService } from 'src/app/servicios/util.service';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.css']
})
export class UsuarioFormularioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  cargando: boolean = false;
  esEdicion: boolean = false;

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usuario.codigo = this.route.snapshot.paramMap.get("codigo");
    if (this.usuario.codigo) {
      this.esEdicion = true;
      this.obtenerUsuario();
    }
  }

  obtenerUsuario() {
    this.cargando = true;
    this.usuarioService.obtenerUsuario({ codigo: this.usuario.codigo }, this);
  }

  despuesDeObtenerUsuario(data) {
    this.usuario = data;
    this.cargando = false;
  }

  guardarUsuario(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.usuario.rut = environment.empresa;
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
    this.router.navigate(['usuario']);
    this.cargando = false;

  }

}
