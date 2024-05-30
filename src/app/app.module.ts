import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { InmueblesComponent } from './componentes/inmuebles/inmuebles.component';

@NgModule({
  declarations: [
    AppComponent,
    InmueblesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    HttpClientModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }










