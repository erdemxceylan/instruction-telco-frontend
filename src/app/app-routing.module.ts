import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'homepage', component: HomepageComponent },
   { path: 'login', component: LoginComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule { }
