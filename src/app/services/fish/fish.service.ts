import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/config/api';
import { Fish } from 'src/app/shared/models/Fish';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  constructor(private http: HttpClient) { }

  getFish(): Observable<Fish[]>{
    return this.http.get<Fish[]>(API_URLS.Fish_URL);
  }

}
