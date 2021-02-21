import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ApiRequestService } from './servicios/api-request.service';
import { AppConfig } from './servicios/app-config';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilService } from './servicios/util.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [EncabezadoComponent],
  providers: [ApiRequestService, AppConfig, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
