import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

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
    return this.http.post<any>(`${environment.apiUrl}/users/login`, {email, password}, {withCredentials: true}).pipe(
      map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  logout(): void {
    this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, {withCredentials: true}).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }

  refreshToken(): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, {withCredentials: true}).pipe(
      map(user => {
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      })
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
}
