import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { email, password }, this.httpOptions).pipe(
      map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  logout(): void {
    this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, this.httpOptions).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }

  refreshToken(): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, this.httpOptions).pipe(
      map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  changeCredentials(email: string, password: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/users/credentials`, { email, password }, this.httpOptions).pipe(
      tap(_ => console.log("Changed credentials")),
      catchError(this.handleError("changeCredentials", ""))
    );
  }


  private refreshTokenTimeout?: NodeJS.Timeout;

  private startRefreshTokenTimer(): void {
    // Parse JSON object from base64-encoded JWT
    const jwtBase64 = this.userValue!.jwtToken!.split(".")[1];
    const jwtToken = JSON.parse(atob(jwtBase64));

    // Set a timeout to refresh the token every (15 - 1) minutes
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error}`);
      return of(result as T);
    }
  }
}
