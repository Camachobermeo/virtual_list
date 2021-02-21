import { Component, OnInit } from '@angular/core';
import { TipoOperacionService } from '../tipo-operacion.service';

@Component({
  selector: 'app-tipo-operacion-listado',
  templateUrl: './tipo-operacion-listado.component.html',
  styleUrls: ['./tipo-operacion-listado.component.css']
})
export class TipoOperacionListadoComponent implements OnInit {

  tipos: any = new Array();

  constructor(
    public tipoService: TipoOperacionService
  ) { }

  ngOnInit(): void {
    this.listarTipos();
  }
  listarTipos() {
    this.tipoService.listarTipos({tienda:'T01'}, this);
  }

  despuesDeListarTipos(data) {
    console.log(data);
    this.tipos = data;
  }

}
