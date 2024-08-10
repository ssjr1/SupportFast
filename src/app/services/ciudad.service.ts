import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ciudad } from '../models/ciudad.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Ciudad/';

  constructor(private http: HttpClient) { }

  getCiudad(): Observable<ciudad[]>{
    return this.http.get<ciudad[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
