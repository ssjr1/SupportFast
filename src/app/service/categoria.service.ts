import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria } from '../modelos/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {



  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Categoria/';

  constructor(private http: HttpClient) { }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCategoriaId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addCategoria(categoria: Categoria): Observable<number> {
    return this.http.post<number>(`${this.myAppUrl}${this.myApiUrl}`, categoria);
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  modificarCategoria(categoria: Categoria): Observable<number> {
    return this.http.put<number>(`${this.myAppUrl}${this.myApiUrl}update`, categoria);
  }
}
