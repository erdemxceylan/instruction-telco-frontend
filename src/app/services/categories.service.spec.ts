import { CategoriesService } from './services.service';
import { TestBed } from '@angular/core/testing';

describe('CategoriesService', () => {
   let service: CategoriesService;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(CategoriesService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
