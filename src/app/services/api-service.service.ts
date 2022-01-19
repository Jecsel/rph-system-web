import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ideahub } from 'googleapis/build/src/apis/ideahub';
import { Observable } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json'
    }),
  };

  // ----------- GET REQUEST --------------//
  getList(): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    
    return this.httpClient
      .get(this.baseUrl + 'list', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  showAllProfile(id: any): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'profile', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  showProfile(id: any): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'profile/' + id, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  // ----------- POST REQUEST -------------//

  signIn(data: any): Observable<void>{
    return this.httpClient
      .post(this.baseUrl + 'auth/sign_in', data)
      .pipe(map((response: any) => {
        localStorage.setItem('token', response.bearer_token);
        localStorage.setItem('user_id', response.user_id);
        localStorage.setItem('has_profile', response.has_profile);
        return response;
      }));
  }

  createProfile(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'profile', data, this.httpOptions)
      .pipe(map((response: any) => {
        localStorage.setItem('has_profile', 'true');
        return response;
      }));
  }

}
