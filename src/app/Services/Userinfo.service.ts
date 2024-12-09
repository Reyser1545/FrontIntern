import { inject, Injectable } from '@angular/core';  // Imports for dependency injection
import { HttpClient } from '@angular/common/http';  // Import HttpClient to make HTTP requests
import { Observable } from 'rxjs';  // Import Observable from RxJS to handle asynchronous data
import { Usermodel } from '../Model/user';  // Import Usermodel (your user data structure) from a model

// Decorator to mark this class as an injectable service
@Injectable({
  providedIn: 'root'  // This service is provided at the root level, meaning it's available throughout the app
})
export class UserInfo {
  // Private variable to store the base URL for the API requests
  private apiUrl = "http://localhost:8080/users";

  // Constructor to inject the HttpClient service into this class
  constructor(private http: HttpClient) {}  // Correct constructor injection for HttpClient
  
  // Method to get all users from the API
  getUsers(): Observable<Usermodel[]> {
    // Makes a GET request to the API and expects an array of Usermodel objects as the response
    return this.http.get<Usermodel[]>(this.apiUrl);
  }

  // Method to add a new user to the API
  addUser(user: Usermodel): Observable<Usermodel> {
    // Makes a POST request to the API to add a new user
    // The user object is passed in the body of the request
    return this.http.post<Usermodel>(this.apiUrl, user);
  }

  // Method to update an existing user
  updateUser(user: Usermodel): Observable<Usermodel> {
    // Makes a PUT request to the API to update the user
    // The user ID is included in the URL to specify which user to update
    return this.http.put<Usermodel>(`${this.apiUrl}/${user.id}`, user);
  }

  // Method to delete a user by their ID
  deleteUser(id: number): Observable<void> {
    // Makes a DELETE request to the API to delete the user by their ID
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
