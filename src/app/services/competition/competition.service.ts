import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Competition } from 'src/app/shared/models/Competition';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/config/api';
import { Page } from 'src/app/shared/models/Page';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private judgePopupInfoSource = new BehaviorSubject<any>(null);
    judgePopupInfo$ = this.judgePopupInfoSource.asObservable();

  constructor(private http: HttpClient) { }


  getAllCompetitions(): Observable<Competition[]>{
    return this.http.get<Competition[]>(API_URLS.Competition_URL);
  }

  getCompetitions(page: number, size: number): Observable<Page<Competition>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Competition>>(API_URLS.Competition_URL, { params });
  }

  addCompetition(competition: Competition): Observable<Competition[]>{
    return this.http.post<Competition[]>(API_URLS.Competition_URL, competition);
  }

  getByCode(code: string): Observable<Competition> {
    return this.http.get<Competition>(API_URLS.Competition_URL + `/${code}`);
  }

  updateCompetition(competition: Competition): Observable<Competition[]>{
    return this.http.put<Competition[]>(API_URLS.Competition_URL + `/${competition.code}`, competition)
  }


  deleteCompetition(id: string): Observable<Competition[]>{
    return this.http.delete<Competition[]>(API_URLS.Competition_URL + `/${id}`)
  }

  updateJudgePopupInfo(info: any) {
    this.judgePopupInfoSource.next(info);
}


}
