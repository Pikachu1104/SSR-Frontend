import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../shared/models/login-request.model';
import { LoginResponse } from '../shared/models/login-response.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data);
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
