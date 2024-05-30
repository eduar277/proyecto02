import { Component, OnInit } from '@angular/core';
import { InmueblesService } from '../../servicios/inmuebles.service';
import { Inmueble } from '../../vo/inmueble';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';
import {FormGroup, FormControl, Validators, ɵTypedOrUntyped, ɵFormGroupValue} from '@angular/forms'; // Importa FormGroup, FormControl y Validators

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
  inmuebles: Inmueble[] = [];
  newInmueble: ɵTypedOrUntyped<{
    descripcion: FormControl<string | null>;
    imagenesRutas: FormControl<any[] | null>;
    numBanios: FormControl<number | null>;
    direccion: FormControl<string | null>;
    titulo: FormControl<string | null>;
    precioPorDia: FormControl<number | null>;
    numHabitaciones: FormControl<number | null>
  }, ɵFormGroupValue<{
    descripcion: FormControl<string | null>;
    imagenesRutas: FormControl<any[] | null>;
    numBanios: FormControl<number | null>;
    direccion: FormControl<string | null>;
    titulo: FormControl<string | null>;
    precioPorDia: FormControl<number | null>;
    numHabitaciones: FormControl<number | null>
  }>, any> = new Inmueble();
  imagenes: File[] = [];
  imagePreviews: string[] = [];
  currentPreviewIndex = 0;
  currentImageIndex = 0;

  // Define inmuebleForm como un nuevo FormGroup
  inmuebleForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    numHabitaciones: new FormControl(0, Validators.required),
    numBanios: new FormControl(0, Validators.required),
    precioPorDia: new FormControl(0, Validators.required),
    imagenesRutas: new FormControl([]),
  });

  constructor(private inmueblesService: InmueblesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getInmuebles();
  }

  getInmuebles(): void {
    this.inmueblesService.getInmuebles().subscribe(inmuebles => this.inmuebles = inmuebles);
  }

  onSubmit(): void {
    if (this.imagenes.length < 4) {
      alert('Por favor, selecciona al menos 4 imágenes.');
      return;
    }
    this.newInmueble = this.inmuebleForm.value;
    this.inmueblesService.createInmueble(this.newInmueble, this.imagenes).subscribe(inmueble => {
      this.inmuebles.push(inmueble);
      alert('Inmueble registrado exitosamente');
    }, error => {
      console.error('Error al registrar el inmueble:', error);
      alert('Ocurrió un error al registrar el inmueble. Por favor, inténtalo de nuevo.');
    });
  }

  onFileChange(event: any): void {
    for (let i = 0; i < event.target.files.length; i++) {
      this.imagenes.push(event.target.files[i]);

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(event.target.files[i]);
    }

    // Abrir el diálogo de vista previa
    this.dialog.open(ImagePreviewDialogComponent, {
      data: this.imagePreviews
    });
  }

  verDetalle(inmueble: Inmueble): void {
    inmueble.expanded = !inmueble.expanded;
  }

  nextImage(inmueble: Inmueble): void {
    if (inmueble.imagenesRutas && inmueble.imagenesRutas.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % inmueble.imagenesRutas.length;
    }
  }

  previousImage(inmueble: Inmueble): void {
    if (inmueble.imagenesRutas && inmueble.imagenesRutas.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + inmueble.imagenesRutas.length) % inmueble.imagenesRutas.length;
    }
  }

  nextPreviewImage(): void {
    this.currentPreviewIndex = (this.currentPreviewIndex + 1) % this.imagePreviews.length;
  }

  previousPreviewImage(): void {
    this.currentPreviewIndex = (this.currentPreviewIndex - 1 + this.imagePreviews.length) % this.imagePreviews.length;
  }
}



