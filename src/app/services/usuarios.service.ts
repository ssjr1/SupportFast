import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Usuarios } from "../models/usuarios.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}/Area`;

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.apiUrl);
  }

  // Obtener un usuario por ID
  getUsuario(id: number): Observable<Usuarios> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Usuarios>(url);
  }

  // Crear un nuevo usuario
  createUsuario(usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.apiUrl, usuario, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Actualizar un usuario existente
  updateUsuario(id: number, usuario: Usuarios): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, usuario, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Eliminar un usuario por ID
  deleteUsuario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
