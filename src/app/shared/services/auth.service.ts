import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IChangePassword, ILogin, ILoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.API;
  private readonly KEY = 'token';

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.setIsAuthenticated(!!this.returnToken());
  }

  public setIsAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  returnToken() {
    return localStorage.getItem(this.KEY) || '';
  }

  saveToken(token: string) {
    localStorage.setItem(this.KEY, token);
    this.setIsAuthenticated(true);
  }

  deleteToken() {
    localStorage.removeItem(this.KEY);
    this.setIsAuthenticated(false);
  }

  haveToken() {
    const hasToken = !!this.returnToken();
    return hasToken;
  }

  onLogin(login: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.API}/users/login`, login);
  }

  onChangePassword(values: IChangePassword): Observable<IChangePassword> {
    return this.http.patch<IChangePassword>(`${this.API}/users/update-password`, values);
  }

  userIdentify (): Observable<any> {
    return this.http.post<any>(`${this.API}/users/identify`, '');
  }

}
