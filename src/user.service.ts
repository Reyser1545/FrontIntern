import { Injectable } from '@angular/core';
//
@Injectable({
  providedIn: 'root'
})
export class UserService {
  clearUser() {
    sessionStorage.removeItem('user'); // Remove user data from sessionStorage
  }
  user: any;
  // Set user data in sessionStorage
  // UserService
setUser(user: any): void {
  if (user) {
    sessionStorage.setItem('user', JSON.stringify(user));  // Store user in sessionStorage
    console.log('User stored in session:', user);
  } else {
    console.error('No user data to store.');
  }
}

gettingUser() {
  const user = sessionStorage.getItem('user');
  console.log('Retrieved user from sessionStorage:', user);  // Log the stored user
  return user ? JSON.parse(user) : null;
}


  getUserRole(): string {
    const user = this.gettingUser();
    return user?.role || ''; // Return role if exists
  }
  // Check if the user is admin
  isAdmin(): boolean {
    const user = this.gettingUser(); // Retrieve user from sessionStorage
    return user?.role === 'admin'; // Directly access role from the user object
  }
  
}

/* The UserService provides a centralized way to manage user data, primarily through sessionStorage. 
It is a core service 
for handling user-related operations, including setting, retrieving, clearing user data, and role-based logic.*/