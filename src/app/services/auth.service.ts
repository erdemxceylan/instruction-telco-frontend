import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginDTO } from '../models/loginDTO';
import { LoginResponse } from '../models/loginResponse';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { environment } from 'src/environments/environment';

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
      this.localStorage.remove('token');
   }

   get isAuthenticated(): boolean {
      // varsa süresi geçmişse yine false
      let token = this.localStorage.get('token');
      if (!token) return false;
      if (this.jwtHelperService.isTokenExpired()) return false;
      return true;
   }

   get jwtToken(): string | null {
      return this.localStorage.get('token');
   }
}