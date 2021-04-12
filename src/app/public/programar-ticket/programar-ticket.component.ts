import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-programar-ticket',
  templateUrl: './programar-ticket.component.html',
  styleUrls: ['./programar-ticket.component.css']
})
export class ProgramarTicketComponent implements OnInit {

  ticket: any;
  tiendaSeleccionada: string = "";
  tipo: string = "";
  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.tiendaSeleccionada = this.route.snapshot.paramMap.get('tienda');
    this.route
      .queryParams
      .subscribe(params => {
        this.ticket = JSON.parse(params['ticket']);
      });
    console.log(this.ticket);
  }

}
