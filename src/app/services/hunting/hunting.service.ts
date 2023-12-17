import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/config/api';
import { Hunting } from 'src/app/shared/models/Hunting';

@Injectable({
  providedIn: 'root'
})
export class HuntingService {

  constructor(private http: HttpClient) { }

  addHunting(hunting: Hunting): Observable<Hunting[]>{
    return this.http.post<Hunting[]>(API_URLS.Hunting_URL, hunting);
  }

}
