import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentesGeneralesModule } from '../componentes-generales/componentes-generales.module';


@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    FormsModule,
    PublicRoutingModule,
    ComponentesGeneralesModule
  ]
})
export class PublicModule { }
