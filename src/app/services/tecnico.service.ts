import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor( private http: HttpClient) { }

  findById(id:any): Observable<tecnico>{
    return this.http.get<tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }
  
  findAll(): Observable<tecnico[]>{
    return this.http.get<tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  create (tecnico: tecnico): Observable<tecnico>{
    return this.http.post<tecnico>(`${API_CONFIG.baseUrl}/tecnicos`,tecnico);
  }

  update(tecnico: tecnico): Observable<tecnico>{
    return this.http.put<tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`,tecnico);
  }

  delete(id: any): Observable<tecnico>{
    return this.http.delete<tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }
}
