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

  getAllDoctors(): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    
    return this.httpClient
      .get(this.baseUrl + 'list/1/get_all_doctor', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

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

  showUserProfile(): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .post(this.baseUrl + 'profile/8/get_user_profile', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getAllUsers(): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'user', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getAllPatients(): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'patient', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  allClinicalRecords(): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'clinical_record', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getOneClinicalRecords(id: any): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'clinical_record/' + id, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getAllOutPatientRecord(): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'outpatient_record/', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getOneOutPatientRecord(id: any): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'outpatient_record/' + id, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getAllPatientOutPatientRecord(id: any): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'outpatient_record/' + id + '/show_patient_outpatient_records', this.httpOptions)
      .pipe(map((response: any) => {
        console.log(response);
        return response;
      }));
  }

  getDashboardData(): Observable<any>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .get(this.baseUrl + 'dashboard/', this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  // ----------- POST REQUEST -------------//

  updateUser(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'user/update_user', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  deleteUser(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .post(this.baseUrl + 'user/deactivate_user', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  registerUser(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'auth/register', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  signIn(data: any): Observable<void>{
    return this.httpClient
      .post(this.baseUrl + 'auth/sign_in', data)
      .pipe(map((response: any) => {
        localStorage.setItem('token', response.bearer_token);
        localStorage.setItem('user_id', response.user_id);
        localStorage.setItem('has_profile', response.has_profile);
        localStorage.setItem('user_profile_id', response.profile_id);
        return response;
      }));
  }

  createPatient(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'patient', data, this.httpOptions)
      .pipe(map((response: any) => {
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

  updateProfile(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'profile/' + data.profile.id +'/update_profile', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  createClinicalRecord(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'clinical_record', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  patientAllClinicalRecords(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'clinical_record/1/patient_clinical_records', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  updateClinicalRecord(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'clinical_record/1/update_clinical_record', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  updateOutpatientRecord(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'outpatient_record/1/update', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  createOutpatientRecord(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'outpatient_record/', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  filterPatients(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };
    return this.httpClient
      .post(this.baseUrl + 'patient/1/filter_patient', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  filterClinical(data: any): Observable<void>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'x-rph-token': localStorage.getItem('token')
      }),
    };

    return this.httpClient
      .post(this.baseUrl + '/clinical_record/1/filter_clinical', data, this.httpOptions)
      .pipe(map((response: any) => {
        return response;
      }));
  }


}
