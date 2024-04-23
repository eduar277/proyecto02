import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inmueble } from '../vo/inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmueblesService {
  private apiUrl = environment.apiUrl + '/api/inmuebles';

  constructor(private http: HttpClient) { }

  public createInmueble(inmueble: Inmueble): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, inmueble);
  }

  public getInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}/listar`);
  }
}


