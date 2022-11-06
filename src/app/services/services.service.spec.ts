import { ServicesService } from './services.service';
import { TestBed } from '@angular/core/testing';

describe('ServicesService', () => {
   let service: ServicesService;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(ServicesService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
