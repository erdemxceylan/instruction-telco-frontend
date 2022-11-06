import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { SplitPipe } from './pipes/split.pipe';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
   declarations: [AppComponent, ServiceListComponent, CreateFakeArrayPipe, SplitPipe, LoginComponent, HomepageComponent, LoadingComponent],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
   ],
   exports: [],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule { }
