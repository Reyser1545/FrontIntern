  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs/internal/Observable';
  import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import HttpClient to make HTTP requests

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiUrl = 'http://192.168.63.141:28080/h2hclient'; // API URL

    constructor(private http: HttpClient) {}

    addcore(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https//192.168.63.136:4200'
  
      });
    }
    
    // Login function that returns an observable
    login(username: string, password: string): Observable<any> {
      const loginData = { username, password };
      return this.http.post<any>(`${this.apiUrl}/login`, loginData);
    }

  }

  //SYSTEM nopass