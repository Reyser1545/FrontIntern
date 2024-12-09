import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// PrimeNG imports for UI components and styling
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register', // Component selector
  standalone: true, // Independent of app.module.ts
  imports: [
    CommonModule, // Angular directives (e.g., ngIf, ngFor)
    ReactiveFormsModule, // For reactive forms
    RouterModule, // Routing (e.g., routerLink)
    HttpClientModule, // HTTP requests
    InputTextModule, // PrimeNG input
    ButtonModule, // PrimeNG button
    PasswordModule, // PrimeNG password input
    MessageModule, // PrimeNG message
  ],
  templateUrl: './register.component.html', // Template file
  styleUrls: ['./register.component.css'], // Styling file
  providers: [MessageService], // MessageService for error/success messages
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // FormGroup to manage form fields
  showPassword: boolean = false; // Toggle password visibility

  constructor(
    private fb: FormBuilder, // FormBuilder for creating forms
    private http: HttpClient, // HttpClient for backend requests
    private router: Router, // Router for navigation
    private messageService: MessageService // MessageService for messages
  ) {}

  ngOnInit(): void {
    // Initializing the form with validation rules
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // Username validation
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6), // Minimum length of 6 characters
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$')
           // Regex for password complexity
        ],
      ], // Password validation with regex for complexity
      role: ['user']
    });
  }

  // Getter for form controls
  get f() {
    return this.registerForm.controls;
  }

  // Toggles password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Handles form submission

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post<any>('http://localhost:8080/users', this.registerForm.value).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          alert(res.message);  // Alert the message from the response (Success message)
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
  
          // Check if the backend error message exists
          if (err.error && err.error.message) {
            // Display the error message returned from the backend
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Registration Failed', 
              detail: err.error.message 
            });
            alert(err.error.message);  // Show the message in an alert as well
          } 
        }
      });
    } else {
      // Form invalid: Show an error message
      this.messageService.add({ severity: 'error', summary: 'Form Invalid', detail: 'Please fill all the required fields correctly.' });
      alert('Please fill all the required fields correctly.');
    }
  }

}
