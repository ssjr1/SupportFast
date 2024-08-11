import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Tecnicos } from "../models/tecnicos.model";

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {
  private apiUrl = `${environment.apiUrl}/Tecnico`;

  constructor(private http: HttpClient) { }

  // Obtener todos los técnicos
  getTecnicos(): Observable<Tecnicos[]> {
    return this.http.get<Tecnicos[]>(this.apiUrl);
  }

  // Obtener un técnico por ID
  getTecnico(id: number): Observable<Tecnicos> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tecnicos>(url);
  }

  // Crear un nuevo técnico
  createTecnico(tecnico: Tecnicos): Observable<Tecnicos> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Tecnicos>(this.apiUrl, tecnico, httpOptions);
  }

  // Actualizar un técnico existente
  updateTecnico(id: number, tecnico: Tecnicos): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, tecnico, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Eliminar un técnico
  deleteTecnico(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}