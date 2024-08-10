import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../modelos/Categoria';
import { Observable } from 'rxjs';
import { Estado } from '../modelos/Estado';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Estado/';

  constructor(private http: HttpClient) { }

  getEstado(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getEstadoId(id: number): Observable<Estado> {
    return this.http.get<Estado>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addEstado(estado: Estado): Observable<number> {
    return this.http.post<number>(`${this.myAppUrl}${this.myApiUrl}`, estado);
  }

  eliminarEstado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  modificarEstado(estado: Estado): Observable<number> {
    return this.http.put<number>(`${this.myAppUrl}${this.myApiUrl}update`, estado);

  }
}
