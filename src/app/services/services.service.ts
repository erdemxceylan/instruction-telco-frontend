import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
}) // Attribute
export class ServicesService {
   controllerUrl = `${environment.apiUrl}/services`;
   // private httpClient: HttpClient;
   // getCategoriesResponse: Object = {};

   constructor(private httpClient: HttpClient) {
      // this.httpClient = httpClient;
   }

   // Generic / Jenerik beraber class'lara ve metotlara üzerinde çalışlacak bir tip geçebiliyoruz.
   getServices(): Observable<Service[]> {
      //get metodu Get Http istediğini hazırlıyor.
      return this.httpClient.get<Service[]>(this.controllerUrl);
   }

   add(service: Service): Observable<Service> {
      return this.httpClient.post<Service>(this.controllerUrl, service);
   }

   update(service: Service): Observable<Service> {
      return this.httpClient.put<Service>(
         `${this.controllerUrl}/${service.id}`,
         service
      );
   }

   delete(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
   }
}
