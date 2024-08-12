import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Soluciones } from "../models/soluciones.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class SolucionesService {
    private apiUrl = `${environment.apiUrl}/Solucion`;
  
    constructor(private http: HttpClient) {}
  
    getSoluciones(): Observable<Soluciones[]> {
      return this.http.get<Soluciones[]>(this.apiUrl);
    }
  
    getSolucion(id: number): Observable<Soluciones> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Soluciones>(url);
    }
  
    createSolucion(solucion: Soluciones): Observable<Soluciones> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
      return this.http.post<Soluciones>(this.apiUrl, solucion, httpOptions);
    }
  
    updateSolucion(id: number, solucion: Soluciones): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/${id}`, solucion);
    }
  
    deleteSolucion(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(url);
    }
  }