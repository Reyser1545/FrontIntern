import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api'; // Import PrimeNG MessageService
import { ToastModule } from 'primeng/toast'; // Import ToastModule
import { ButtonModule } from 'primeng/button'; // Import ButtonModule
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service'; // Custom service to manage user state
import { Router } from '@angular/router';  // Import Router
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login', // Component selector for usage in HTML
  standalone: true, // Indicates this component is not dependent on app.module.ts
  imports: [
    CommonModule, // Provides common directives like ngIf, ngFor
    ReactiveFormsModule, // Enables reactive forms
    ToastModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './login.component.html', // HTML template for the component
  styleUrls: ['./login.component.css'], // External CSS for styling
  providers: [MessageService] // Provide MessageService here
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false; // State to track password visibility

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService, // Inject MessageService
    private http: HttpClient, // For HTTP requests
    private router: Router,  // Inject Router into constructor

  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          
        ],
      ],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      // Display errors using MessageService
      if (this.f['username'].invalid) {
        this.messageService.add({
          severity: 'error',
          summary: 'Username Error',
          detail: 'Username is required or must be at least 3 characters long.',
        });
      }
      if (this.f['password'].invalid) {
        this.messageService.add({
          severity: 'error',
          summary: 'Password Error',
          detail: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        });
      }
      return;
    }

    // Prepare login data to be sent to API
    const loginData = {
      username: this.f['username'].value,
      password: this.f['password'].value
    };

    // Make API call
    this.http.post<any>('http://192.168.63.141:28080/h2hclient/login', loginData).subscribe({
      next: (response) => {
        console.log('Login successful, API response:', response);
        
        const token = response.authToken || response.entries;  // Fallback to entries
        if (token) {
          localStorage.setItem('authToken', token);  // Save token
          console.log('Auth token stored:', token);
          this.router.navigate(['/main']);
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'You have logged in successfully.',
          });
        } else {
          console.error('Auth token not found in response');
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Unexpected server response. Please try again later.',
          });
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: error.status === 500 ? 'Internal server error. Please try again later.' : 'Invalid username or password.',
        });
      }
    });
    
  }
}
