import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Perfiles } from "../models/perfiles.model";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
  })
  export class PerfilesService {
    private apiUrl = `${environment.apiUrl}/Perfil`; // Reemplaza con la URL de tu API
  
    constructor(private http: HttpClient) { }
  
    // Obtener todos los perfiles
    getPerfiles(): Observable<Perfiles[]> {
      return this.http.get<Perfiles[]>(this.apiUrl);
    }
  
    // Obtener un perfil por ID
    getPerfil(id: number): Observable<Perfiles> {
      return this.http.get<Perfiles>(`${this.apiUrl}/${id}`);
    }
  
    // Crear un nuevo perfil
    createPerfil(perfil: Perfiles): Observable<Perfiles> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<Perfiles>(this.apiUrl, perfil, httpOptions);
    }
  
    // Actualizar un perfil existente
    updatePerfil(id: number, perfil: Perfiles): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${id}`, perfil);
    }
  
    // Eliminar un perfil
    deletePerfil(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(url);
    }
  }