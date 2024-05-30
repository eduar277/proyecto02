import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InmueblesComponent } from './componentes/inmuebles/inmuebles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { ImagePreviewDialogComponent } from './componentes/image-preview-dialog/image-preview-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InmueblesComponent,
    ImagePreviewDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule, // Añade MatDialogModule a la lista de imports
    BrowserAnimationsModule // Añade BrowserAnimationsModule a la lista de imports
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ImagePreviewDialogComponent] // Añade ImagePreviewDialogComponent a la lista de entryComponents
})
export class AppModule { }





