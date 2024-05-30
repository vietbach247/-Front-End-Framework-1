import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl + 'auth'}/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl + 'auth'}/login`, credentials)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }
  forgotPassword(email: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl + 'auth'}/forgotPassword`, { email })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Đã xảy ra lỗi không xác định!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Lỗi phía client: ${error.error.message}`;
    } else {
      errorMessage = `  ${error.error.message || error.message}`;
    }
    console.error('thông báo lỗi:' + errorMessage);

    if (error.status === 404) {
      this.router.navigate(['/not-found']);
    }

    return throwError(errorMessage);
  }
}
