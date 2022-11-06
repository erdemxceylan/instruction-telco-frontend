import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginDTO } from '../models/loginDTO';
import { LoginResponse } from '../models/loginResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export const TOKEN_KEY = 'TOKEN_KEY';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   private controllerUrl = `${environment.apiUrl}/auth`;

   constructor(
      private httpClient: HttpClient,
      private localStorage: LocalStorageService,
      private jwtHelperService: JwtHelperService
   ) { }

   login(LoginDTO: LoginDTO): Observable<LoginResponse> {
      return this.httpClient.post<LoginResponse>(
         `${this.controllerUrl}/login`,
         LoginDTO
      );
   }

   logout() {
      this.localStorage.remove(TOKEN_KEY);
   }

   get isAuthenticated(): boolean {
      if (!this.localStorage.get(TOKEN_KEY)) return false;
      if (this.jwtHelperService.isTokenExpired()) return false;
      return true;
   }

   get jwtToken(): string | null {
      return this.localStorage.get(TOKEN_KEY);
   }
}