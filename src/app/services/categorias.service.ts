import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Categorias } from "../models/categorias.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = `${environment.apiUrl}/Categoria`;

  constructor(private http: HttpClient) { }

  // Obtener todos las Categorias
  getCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(this.apiUrl);
  }

  // Obtener una categoria por ID
  getCategoria(id: number): Observable<Categorias> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Categorias>(url);
  }

  // Crear nueva categoria
  createCategoria(categoria: Categorias): Observable<Categorias> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Categorias>(this.apiUrl, categoria, httpOptions);
  }

  // Actualizar una categoria existente
  updateCategoria(id: number, categoria: Categorias): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, categoria, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Eliminar un técnico
  deleteCategoria(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
