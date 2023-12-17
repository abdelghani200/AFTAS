import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/config/api';
import { Ranking } from 'src/app/shared/models/Ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }

  registerMember(ranking: Ranking): Observable<Ranking[]>{
    return this.http.post<Ranking[]>(API_URLS.Ranking_URL, ranking);
  }

  getRankByCompetition(): Observable<Ranking[]>{
    return this.http.get<Ranking[]>(API_URLS.Ranking_URL)
  }
  
  getRank(competitionCode: String): Observable<Ranking[]>{
    return this.http.get<Ranking[]>(API_URLS.Ranking_URL + `/${competitionCode}`)
  }

}
