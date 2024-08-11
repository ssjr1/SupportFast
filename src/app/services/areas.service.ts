import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Areas } from "../models/areas.model";

@Injectable({
  providedIn: 'root'
})
export class AreasService
{
    private apiUrl = `${environment.apiUrl}/Area`;

    constructor(private http: HttpClient) { }

    // Obtener todas las áreas
    getAreas(): Observable<Areas[]> {
        return this.http.get<Areas[]>(this.apiUrl);
    }

    // Obtener una área por ID
    getArea(id: number): Observable<Areas> {
        return this.http.get<Areas>(`${this.apiUrl}/${id}`);
    }

    // Crear una nueva área
    createArea(area: Areas): Observable<Areas> {
        return this.http.post<Areas>(this.apiUrl, area);
    }

    // Actualizar una área existente
    updateArea(id: number, area: Areas): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, area);
    }

    // Eliminar una área por ID
    deleteArea(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}