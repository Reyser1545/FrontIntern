import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.gettingUser();
    if (user) {
      console.log('AuthGuard: User is authenticated. Access granted.');
      return true; // Allow access
    } else {
      console.log('AuthGuard: User not authenticated. Redirecting to login.');
      this.router.navigate(['/login']); // Redirect to login
      return false; // Deny access
    }
  }
}
//adminguard
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isAdmin()) {
      console.log('AdminGuard: User is an admin. Access granted to admin routes.');
      return true; // Allow access to admin routes
    } else {
      console.log('AdminGuard: User is not an admin. Redirecting to main page.');
      this.router.navigate(['/mainpage']); // Redirect to main page if not an admin
      return false; // Deny access
    }
  }
}