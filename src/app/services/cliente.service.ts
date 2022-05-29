import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( private http: HttpClient) { }

  findById(id:any): Observable<cliente>{
    return this.http.get<cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
  
  findAll(): Observable<cliente[]>{
    return this.http.get<cliente[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  create (cliente: cliente): Observable<cliente>{
    return this.http.post<cliente>(`${API_CONFIG.baseUrl}/clientes`,cliente);
  }

  update(cliente: cliente): Observable<cliente>{
    return this.http.put<cliente>(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`,cliente);
  }

  delete(id: any): Observable<cliente>{
    return this.http.delete<cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
}
