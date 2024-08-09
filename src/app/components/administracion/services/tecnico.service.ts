import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tecnico } from '../models/tecnico.model';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Carrera/';

  constructor(private http: HttpClient) { }

  getTecnico(): Observable<tecnico[]>{
    return this.http.get<tecnico[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
