import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inmueble } from '../vo/inmueble';
import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {
  private apiUrl = 'http://localhost:8862/api/inmuebles';

  constructor(private http: HttpClient) { }

  getInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(this.apiUrl + '/all');
  }

  createInmueble(inmueble: ɵTypedOrUntyped<{
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
  }>, any>, imagenes: File[]): Observable<Inmueble> {
    const formData: FormData = new FormData();
    formData.append('inmueble', new Blob([JSON.stringify(inmueble)], {
      type: "application/json"
    }));
    for (let i = 0; i < imagenes.length; i++) {
      formData.append('imagenes', imagenes[i], imagenes[i].name);
    }
    return this.http.post<Inmueble>(this.apiUrl + '/registro', formData);
  }
}




