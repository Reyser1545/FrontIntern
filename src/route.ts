import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { ReportComponent } from './app/report/report.component';
import { MainComponent } from './app/main/main.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login Page' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  { path: 'register', component: RegisterComponent, title: 'Register Page' },
  { path: 'report', component: ReportComponent, title: 'Report Page' },
  { path: 'main', component: MainComponent, title: 'Main Page'}
];

export default routes;

