import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   label!: string;

   constructor(
      private authService: AuthService,
      private router: Router,
   ) { }

   ngOnInit(): void {
      console.log('auth?', this.authService.isAuthenticated);
      this.setLabel();
   }

   navigate() {
      if (this.authService.isAuthenticated) this.authService.logout();
      this.router.navigateByUrl(this.authService.isAuthenticated ? '/homepage' : '/login');
      this.setLabel();
   }

   setLabel() {
      this.label = this.authService.isAuthenticated ? 'Logout' : 'Login';
   }
}
