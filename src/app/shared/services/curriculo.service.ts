import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculoService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  saveCurriculo(values: any): Observable<any> {
    return this.http.post<any>(`${this.API}/curriculum/create`, values);
  }

  getCurriculos(): Observable<any> {
    return this.http.get<any>(`${this.API}/curriculum`);
  }
}
