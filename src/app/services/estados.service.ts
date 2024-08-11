import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Estados } from "../models/estados.model";

@Injectable({
    providedIn: 'root'
  })
  export class EstadosService {
    private apiUrl = `${environment.apiUrl}/Estado`;
  
    constructor(private http: HttpClient) { }
  
    // Obtener todos los estados
    getEstados(): Observable<Estados[]> {
      return this.http.get<Estados[]>(this.apiUrl);
    }
  
    // Obtener un estado por ID
    getEstado(id: number): Observable<Estados> {
      return this.http.get<Estados>(`${this.apiUrl}/${id}`);
    }
  
    // Crear un nuevo estado
    createEstado(estado: Estados): Observable<Estados> {
      return this.http.post<Estados>(this.apiUrl, estado);
    }
  
    // Actualizar un estado existente
    updateEstado(id: number, estado: Estados): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${id}`, estado);
    }
  
    // Eliminar un estado
    deleteEstado(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }