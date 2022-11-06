import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
   constructor(
      private authService: AuthService
   ) { }

   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      if (this.authService.isAuthenticated) {
         let newRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${this.authService.jwtToken}` },
         });
         return next.handle(newRequest);
      }
      return next.handle(request);
   }
}