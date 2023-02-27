import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponse, RegisterUser, User } from '../shared/models/users.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(environment.baseUrl + `/users/email/${email}`, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(environment.baseUrl + '/users', { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(environment.baseUrl + `/${id}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  update(id: number, user: RegisterUser): Observable<any> {
    return this.http
      .put<any>(environment.baseUrl + `/users/${id}`, user, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete(environment.baseUrl + `/users/${id}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // In a real life app, we may send the error to some remote logging service
    // instead of just logging it to the console
    let errorMessage = '';
    if (error.error instanceof ErrorEvent)
      errorMessage = `An error occured: ${error.error.message}`;
    else
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;

    console.log(errorMessage);

    return throwError(() => errorMessage);
  }
}
