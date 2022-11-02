import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CreateFakeArrayPipe } from './pipes/create-fake-array.pipe';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ListviewComponent } from './components/listview/listview.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { SplitPipe } from './pipes/split.pipe';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
   declarations: [AppComponent, ListviewComponent, CreateFakeArrayPipe, SplitPipe, LoginComponent, HomepageComponent, LoadingComponent],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
   ],
   exports: [],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule { }
