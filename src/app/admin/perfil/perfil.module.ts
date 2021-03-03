import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { ComponentesGeneralesModule } from 'src/app/componentes-generales/componentes-generales.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    ComponentesGeneralesModule,
    PerfilRoutingModule,
    FormsModule
  ]
})
export class PerfilModule { }
