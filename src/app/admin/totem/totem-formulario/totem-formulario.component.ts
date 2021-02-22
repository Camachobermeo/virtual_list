import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TiendaService } from '../../tienda/tienda.service';

@Component({
  selector: 'app-totem-formulario',
  templateUrl: './totem-formulario.component.html',
  styleUrls: ['./totem-formulario.component.css']
})
export class TotemFormularioComponent implements OnInit {

  tiendas: any = new Array();
  tiendaSeleccionada: string = "";

  constructor(
    private router: Router,
    public tiendaService: TiendaService
  ) { }

  ngOnInit(): void {
    this.tiendaService.listarTiendas({}, this);
  }

  activarCargando() {
    document.getElementById("cargando").hidden = false;
  }

  guardar() {
    this.router.navigate(["totem"]);
  }

  despuesDeListarTiendas(data) {
    this.tiendas = data;
  }

}
