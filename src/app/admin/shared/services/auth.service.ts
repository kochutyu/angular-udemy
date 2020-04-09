import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return ''
  }

  login(user: User): Observable<any> {
    return this.http.post('', user);
  }

  logOut(): void {

  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(): void {

  }
}
