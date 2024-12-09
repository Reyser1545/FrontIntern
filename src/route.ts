import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { MainpageComponent } from './app/mainpage/mainpage.component';
import { AdminPageComponent } from './app/adminpage/adminpage.component';
import { UserComponent } from './app/Components/user/user.component';
import { PlaygroundComponent } from './app/playground/playground.component';
import { AuthGuard } from './app/auth.guard';
import { AdminGuard } from './app/auth.guard';
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  { path: 'register', component: RegisterComponent, title: 'Register Page' },
  { path: 'mainpage', component: MainpageComponent, title: 'Main Page',canActivate: [AuthGuard] },  // Protect this route
  { path: 'admin', component: AdminPageComponent, title: 'Admin Page', canActivate: [AdminGuard] }, // Protect this route
  { path: 'user', component: UserComponent, title: 'User Page', canActivate: [AuthGuard] }, // Protect this route
  { path: 'play', component: PlaygroundComponent, title: 'Playground Page', canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }, // Redirect unknown routes to hom
];

export default routes;

