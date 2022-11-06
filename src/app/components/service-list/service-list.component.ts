import { Component, OnInit } from '@angular/core';
import {
   FormBuilder,
   FormGroup,
   Validators,
} from '@angular/forms';

import { Service } from 'src/app/models/service';
import { ServicesService } from '../../services/services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-service-list',
   templateUrl: './service-list.component.html',
   styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
   services!: Service[];
   addForm!: FormGroup;
   addError: string = '';
   editForm!: FormGroup;
   editError: string = '';
   isEditing: boolean = false;
   editId!: number;

   constructor(
      private servicesService: ServicesService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
   ) { }

   ngOnInit(): void {
      this.getServices();
      this.createForms();
   }

   createForms() {
      this.addForm = this.formBuilder.group({
         name: ['', Validators.required],
      });
      this.editForm = this.formBuilder.group({
         name: ['', Validators.required],
      });
   }

   getServices(): void {
      this.servicesService.getServices().subscribe((response) => {
         this.services = response;
      });
   }

   add(): void {
      if (this.addForm.invalid) {
         this.toastr.warning('Lütfen bir servis ismi giriniz');
         this.addError = 'Form is invalid';
         return;
      }
      if (this.addError) this.addError = '';

      const service: Service = {
         ...this.addForm.value,
      };

      this.servicesService.add(service).subscribe({
         next: () => {
            this.toastr.success(`${service.name} has been added.`);
         },
         error: (err) => {
            console.log(err);
            this.addError = err.statusText;
            this.toastr.error(this.addError);
            this.toastr.error(err.statusText);
         },
         complete: () => {
            if (this.addError) this.addError = '';
            this.addForm.reset();
            this.getServices();
         },
      });
   }

   edit(id: number) {
      this.isEditing = true;
      this.editId = id;
      this.editForm.get('name')?.setValue(this.services.find(service => service.id === id)?.name);
   }

   update(): void {
      if (this.editForm.invalid || !this.editId) {
         this.editError = 'Form is invalid';
         return;
      }
      if (this.editError) this.editError = '';

      const service: Service = {
         id: this.editId,
         ...this.editForm.value,
      };

      this.servicesService.update(service).subscribe({
         next: () => {
            this.toastr.success('İşlem başarılı');
         },
         error: (err) => {
            console.log(err);
            this.editError = err.statusText;
            this.toastr.error(this.editError);
            this.toastr.error(err.statusText);
         },
         complete: () => {
            if (this.editError) this.editError = '';
            this.editForm.reset();
            this.getServices();
         },
      });

      this.isEditing = false;
   }

   delete(id: number) {
      this.servicesService.delete(id).subscribe(() => {
         this.getServices();
      });
   }
}
