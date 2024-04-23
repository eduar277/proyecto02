import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InmueblesService } from '../../servicios/inmuebles.service'; // Corregir la ruta de importación del servicio
import { Inmueble } from '../../vo/inmueble'; // Corregir la ruta de importación del modelo Inmueble

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
  inmuebleForm: FormGroup;
  inmuebles: Inmueble[] = [];

  constructor(private formBuilder: FormBuilder, private inmueblesService: InmueblesService) {
    this.inmuebleForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      numHabitaciones: ['', Validators.required],
      numBanios: ['', Validators.required],
      precioPorDia: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.inmuebleForm && this.inmuebleForm.valid) {
      const formData = this.inmuebleForm.value;
      this.inmueblesService.createInmueble(formData).subscribe(
        (response: any) => {
          console.log('Inmueble registrado exitosamente:', response);
          // Mostrar un mensaje de confirmación al usuario
          alert('¡Inmueble registrado exitosamente!');
        },
        (error: any) => {
          console.error('Error al registrar el inmueble:', error.message || 'Ha ocurrido un error inesperado');
          // Aquí también podrías agregar lógica para manejar errores y mostrar mensajes de error al usuario
        }
      );
    } else {
      console.error('El formulario no es válido');
      // Aquí también podrías mostrar un mensaje al usuario indicando que el formulario no es válido
    }
  }
}
