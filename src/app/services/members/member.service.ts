import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/config/api';
import { Member } from 'src/app/shared/models/Member';
import { Page } from 'src/app/shared/models/Page';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getMember(): Observable<Member[]>{
    return this.http.get<Member[]>(API_URLS.Member_URL);
  }

  searchMembers(searchTerm: string): Observable<Member[]> {
    const searchUrl = `${API_URLS.Member_URL}/search?searchTerm=${searchTerm}`;
    return this.http.get<Member[]>(searchUrl);
  }

  addMember(member: Member): Observable<Member[]>{
    return this.http.post<Member[]>(API_URLS.Member_URL, member);
  }

  getMembers(page: number, size: number): Observable<Page<Member>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Member>>(API_URLS.Member_URL, { params });
  }

  updateMember(member: Member): Observable<Member>{
    return this.http.put<Member>(API_URLS.Member_URL + `/${member.num}`, member);
  }

  deleteMember(id: number){
    return this.http.delete(API_URLS.Member_URL + `/${id}`);
  }

}
