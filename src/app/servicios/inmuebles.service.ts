import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inmueble } from '../vo/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {
  private apiUrl = 'http://localhost:8862/api/inmuebles';

  constructor(private http: HttpClient) { }

  getInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}/all`);
  }

  createInmueble(inmueble: {
    descripcion: string;
    direccion: string;
    titulo: string;
    precioPorDia: number;
    numHabitaciones: number;
    numBanios: number;
  }, imagenes: string[]): Observable<Inmueble> {
    const formData: FormData = new FormData();
    formData.append('inmueble', new Blob([JSON.stringify(inmueble)], {
      type: 'application/json'
    }));
    for (let i = 0; i < imagenes.length; i++) {
      const file = this.dataURLtoFile(imagenes[i], `image${i}.png`);
      formData.append('imagenes', file);
    }
    return this.http.post<Inmueble>(`${this.apiUrl}/registro`, formData);
  }

  private dataURLtoFile(dataurl: string, filename: string): File {
    const [mimeInfo, base64Data] = dataurl.split(',');
    const mimeMatch = mimeInfo.match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error('Invalid data URL format');
    }
    const mime = mimeMatch[1];
    const bstr = atob(base64Data);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}








