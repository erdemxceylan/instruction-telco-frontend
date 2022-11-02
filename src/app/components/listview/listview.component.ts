import { Component, OnInit } from '@angular/core';
import {
   FormBuilder,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';

import { Service } from 'src/app/models/service';
import { ServicesService } from '../../services/services.service';

@Component({
   selector: 'app-listview',
   templateUrl: './listview.component.html',
   styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
   // component içerisinde yer alan properties bizim için state oluyor.
   // ?: null olabilir demek.
   // !: null olmayacak, bu property'i kullanmadan önce atama işlemini gerçekleştiriceğiz söz vermiş oluyoruz.
   services!: Service[];
   serviceForm!: FormGroup;
   serviceIdToDelete: number = 0; // state
   error: string = '';

   constructor(
      private servicesService: ServicesService,
      private formBuilder: FormBuilder
   ) { }

   ngOnInit(): void {
      this.getServices();
      this.createServiceForm();
   }

   createServiceForm() {
      this.serviceForm = this.formBuilder.group({
         name: ['', Validators.required],
      });
   }

   getServices(): void {
      this.servicesService.getServices().subscribe((response) => {
         this.services = response;
      });
   }

   // changeserviceIdToDelete(event: any) {
   //   this.serviceIdToDelete = event.target.value;
   // }

   add(): void {
      if (this.serviceForm.invalid) {
         this.error = 'Form is invalid';
         return;
      }
      if (this.error) this.error = '';

      const service: Service = {
         ...this.serviceForm.value,
      };
      this.servicesService.add(service).subscribe({
         next: (response) => {
            console.info(`Service(${response.id}) has added.`);
         },
         error: (err) => {
            console.log(err);

            this.error = err.statusText;
         },
         complete: () => {
            if (this.error) this.error = '';
            this.serviceForm.reset();
            this.getServices();
         },
      });
   }

   edit() {
   }

   delete(id: number) {
      this.servicesService.delete(id).subscribe(() => {
         this.getServices();
      });
   }
}
