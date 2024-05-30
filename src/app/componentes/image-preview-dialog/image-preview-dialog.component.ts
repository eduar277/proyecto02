import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InmueblesService } from '../../servicios/inmuebles.service';
import { Inmueble } from '../../vo/inmueble';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
  inmuebleForm: FormGroup;
  inmuebles: Inmueble[] = [];
  inmuebleSeleccionado: Inmueble | undefined;
  currentImageIndex: number = 0;
  imagePreviews: string[] = [];
  previewAccepted: boolean = false;

  constructor(private fb: FormBuilder, private inmueblesService: InmueblesService) {
    this.inmuebleForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      numHabitaciones: ['', Validators.required],
      numBanios: ['', Validators.required],
      precioPorDia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getInmuebles();
  }

  getInmuebles(): void {
    this.inmueblesService.getInmuebles().subscribe(inmuebles => this.inmuebles = inmuebles);
  }

  onSubmit(): void {
    if (this.inmuebleForm.valid) {
      const inmueble = this.inmuebleForm.value;
      this.inmueblesService.createInmueble(inmueble, this.imagePreviews).subscribe(() => {
        this.getInmuebles();
        this.inmuebleForm.reset();
        this.imagePreviews = [];
        this.previewAccepted = false;
      });
    }
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    this.imagePreviews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
      reader.readAsDataURL(files[i]);
    }
  }

  seleccionarInmueble(inmueble: Inmueble): void {
    this.inmuebleSeleccionado = inmueble;
    this.currentImageIndex = 0;
  }

  verDetalle(inmueble: Inmueble): void {
    this.seleccionarInmueble(inmueble);
    // Aquí puedes abrir un modal o redirigir a una página de detalle
  }

  previousImage(): void {
    if (this.inmuebleSeleccionado && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.inmuebleSeleccionado?.imagenesRutas && this.currentImageIndex < this.inmuebleSeleccionado.imagenesRutas.length - 1) {
      this.currentImageIndex++;
    }
  }

  acceptPreviews(): void {
    this.previewAccepted = true;
  }
}



