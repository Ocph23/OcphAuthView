import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './auth/profile/profile.component';
import { DeveloperComponent, DeveloperModalDialog } from './developer/developer.component';
import { HttpClientModule } from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',      component: RegisterComponent },
  { path: 'profile',      component: ProfileComponent },

  { path: 'developer',      component: DeveloperComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];






@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DeveloperComponent,
    DeveloperModalDialog
   
  ],
  imports: [
    NoopAnimationsModule,MatProgressSpinnerModule,MatButtonModule,
    BrowserModule,AppRoutingModule,  HttpClientModule,  FormsModule, 
    ReactiveFormsModule,MatTableModule,MatPaginatorModule,MatSortModule,
    MatDialogModule,MatFormFieldModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  entryComponents: [
    DeveloperModalDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
