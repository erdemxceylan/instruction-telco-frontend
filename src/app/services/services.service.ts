import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root',
})
export class ServicesService {
   controllerUrl = `${environment.apiUrl}/services`;

   constructor(private httpClient: HttpClient) { }

   getServices(): Observable<Service[]> {
      return this.httpClient.get<Service[]>(this.controllerUrl);
   }

   add(service: Service): Observable<Service> {
      return this.httpClient.post<Service>(this.controllerUrl, service);
   }

   update(service: Service): Observable<Service> {
      return this.httpClient.put<Service>(`${this.controllerUrl}/${service.id}`, service);
   }

   delete(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
   }
}
