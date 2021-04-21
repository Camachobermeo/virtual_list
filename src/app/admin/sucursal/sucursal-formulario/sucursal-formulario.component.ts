import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from 'src/app/entidades/Sucursal';
import { UtilService } from 'src/app/servicios/util.service';
import { SucursalService } from '../sucursal.service';

@Component({
  selector: 'app-sucursal-formulario',
  templateUrl: './sucursal-formulario.component.html'
})
export class SucursalFormularioComponent implements OnInit {

  sucursal: Sucursal = new Sucursal ();
  cargando: boolean = false;
  esEdicion: boolean = false;

  constructor(
    private router: Router,
    public sucursalService: SucursalService,
    public utilService: UtilService,
    public toastr: ToastrService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.sucursal.codigo = this.route.snapshot.paramMap.get("codigo");
    if (this.sucursal.codigo) {
      this.esEdicion = true;
      this.obtenerSucursal();
    }
  }

  obtenerSucursal() {
    this.cargando = true;
    this.sucursalService.obtenerSucursal({ codigo: this.sucursal.codigo }, this);
  }


  despuesDeObtenerSucursal(data) {
    this.sucursal = data;
    this.cargando = false;
  }
 
  guardarSucursal(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      this.sucursal.rut = localStorage.getItem('empresa');
      if (this.esEdicion) {
        this.sucursal['esEdicion'] = true;
      }else {
        this.sucursal['esEdicion'] = false;
      }
      this.sucursal.l_inicio_atencion = this.sucursal.l_inicio_atencion || null;
      this.sucursal.m_inicio_atencion = this.sucursal.m_inicio_atencion || null;
      this.sucursal.mm_inicio_atencion = this.sucursal.mm_inicio_atencion || null;
      this.sucursal.j_inicio_atencion = this.sucursal.j_inicio_atencion || null;
      this.sucursal.v_inicio_atencion = this.sucursal.v_inicio_atencion || null;
      this.sucursal.s_inicio_atencion = this.sucursal.s_inicio_atencion || null;
      this.sucursal.d_inicio_atencion = this.sucursal.d_inicio_atencion || null;
      this.sucursal.l_fin_atencion = this.sucursal.l_fin_atencion || null;
      this.sucursal.m_fin_atencion = this.sucursal.m_fin_atencion || null;
      this.sucursal.mm_fin_atencion = this.sucursal.mm_fin_atencion || null;
      this.sucursal.j_fin_atencion = this.sucursal.j_fin_atencion || null;
      this.sucursal.v_fin_atencion = this.sucursal.v_fin_atencion || null;
      this.sucursal.s_fin_atencion = this.sucursal.s_fin_atencion || null;
      this.sucursal.d_fin_atencion = this.sucursal.d_fin_atencion || null;
      this.sucursalService.guardarSucursal(this.sucursal, this);
    } else {
      this.toastr.error("Complete los campos requeridos.", "Aviso");
      this.cargando = false;
    }
  }

  despuesDeGuardarSucursal(data) {
    this.toastr.success(data.mensaje, "Aviso");
    this.router.navigate(['admin/sucursal']);
    this.cargando = false;
  }


}
