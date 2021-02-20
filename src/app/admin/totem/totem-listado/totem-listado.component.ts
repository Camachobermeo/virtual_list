import { Component, OnInit } from '@angular/core';
import { TotemService } from '../totem.service';

@Component({
  selector: 'app-totem-listado',
  templateUrl: './totem-listado.component.html',
  styleUrls: ['./totem-listado.component.css']
})
export class TotemListadoComponent implements OnInit {

  constructor(
    public totemService: TotemService
  ) { }

  ngOnInit(): void {
    this.listarTotems();
  }

  listarTotems() {
    this.totemService.listarTotems({ tienda: 'T01' }, this, {});
  }

  despuesDeListarTotems(data) {
    console.log(data);
  }

}
