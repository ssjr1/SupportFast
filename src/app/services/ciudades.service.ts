import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Ciudades } from "../models/ciudades.model";

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  private apiUrl = `${environment.apiUrl}/Ciudad`; // Ajusta la URL base según sea necesario

  constructor(private http: HttpClient) { }

  // Obtener todas las ciudades
  getCiudades(): Observable<Ciudades[]> {
    return this.http.get<Ciudades[]>(this.apiUrl);
  }

  // Obtener una ciudad por ID
  getCiudad(id: number): Observable<Ciudades> {
    return this.http.get<Ciudades>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva ciudad
  createCiudad(ciudad: Ciudades): Observable<Ciudades> {
    return this.http.post<Ciudades>(`${this.apiUrl}`, ciudad);
  }

  // Actualizar una ciudad existente
  updateCiudad(id: number, ciudad: Ciudades): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ciudad);
  }

  // Eliminar una ciudad por ID
  deleteCiudad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}