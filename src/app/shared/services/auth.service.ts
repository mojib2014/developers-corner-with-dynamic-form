import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {
  AuthResponse,
  LoginUser,
  RegisterUser,
  User,
} from '../models/users.model';
import { NotificationService } from './notification.service';

@Injectable()
export class AuthService implements OnDestroy {
  redirectUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {
    console.log('AuthService instance created.');
  }
  ngOnDestroy(): void {
    console.log('AuthService instance destroyed.');
  }

  register(user: RegisterUser): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.baseUrl + '/auth/register', user, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.setIsLoggedIn();
          this.notificationService.success(
            'Register User',
            'Successfully registered.'
          );
        }),
        catchError(this.handleError)
      );
  }

  login(user: LoginUser): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.baseUrl + '/auth/login', user, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.setIsLoggedIn();
          this.notificationService.success(
            'Login User',
            'Successfully logged in.'
          );
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('isLoggedIn');
    return this.http
      .get<any>(environment.baseUrl + '/users/logout', {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.notificationService.success(
            'Logout',
            'Successfully logged out.'
          );
          this.router.navigate(['/login']);
        }),
        catchError(this.handleError)
      );
  }

  setIsLoggedIn() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(environment.baseUrl + `/users/loggedin-user`, {
        withCredentials: true,
      })
      .pipe(
        tap(() =>
          this.notificationService.info(
            'Getting current user',
            'Successfully retreived current user.'
          )
        ),
        catchError(this.handleError)
      );
  }

  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  }

  private handleError(error: HttpErrorResponse) {
    // In a real life app, we may send the error to some remote logging service
    // instead of just logging it to the console
    let errorMessage = '';
    if (error.error instanceof ErrorEvent)
      errorMessage = `An error occured: ${error.error.message}`;
    else {
      const { message } = error.error;
      const { error: err } = error;
      errorMessage = `Server returned code: ${
        error.status
      }, error message is: ${message ? message : err ? err : null}`;
    }

    console.log(error);

    return throwError(() => errorMessage);
  }
}
