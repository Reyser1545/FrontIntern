import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
// PrimeNG imports for UI components and styling
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';

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
    DropdownModule, // PrimeNG dropdown for country selection
    CalendarModule, // PrimeNG calendar for date selection
    CheckboxModule, // PrimeNG checkbox for terms acceptance
    FormsModule, // Angular FormsModule for template-driven forms
    DialogModule // PrimeNG dialog for terms modal
  ],
  templateUrl: './register.component.html', // Template file
  styleUrls: ['./register.component.css'], // Styling file
  providers: [MessageService], // MessageService for error/success messages
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // FormGroup to manage form fields
  showPassword: boolean = false; // Toggle password visibility
  termsVisible: boolean = false; // Control the visibility of the terms modal

  // Country list for dropdown
  countryList = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'India', code: 'IN' },
    { name: 'Australia', code: 'AU' },
    { name: 'Thailand', code: 'TH' },
    { name: 'China', code: 'CH' },
    { name: 'Japan', code: 'JP' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Korea', code: 'KR' },
  ];

  constructor(
    private fb: FormBuilder, // FormBuilder for creating forms
    private http: HttpClient, // HttpClient for backend requests
    private router: Router, // Router for navigation
    private messageService: MessageService // MessageService for messages
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize the form
  }

  /**
   * Initializes the registration form with validation rules.
   */
  private initializeForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // Username field with required and minlength validators
      email: ['', [Validators.required, Validators.email]], // Email field with required and email validators
      password: [
        '', 
        [
          Validators.required, 
          Validators.pattern(
            '(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}' // Password pattern for strong passwords
          )
        ]
      ],
      confirmPassword: ['', [Validators.required, this.matchPassword]], // Confirm password with custom validator
      gender: ['', Validators.required], // Gender field (required)
      dob: ['', Validators.required], // Date of birth field (required)
      country: ['', Validators.required], // Country field (required)
      terms_accepted: [false, Validators.requiredTrue] // Terms and conditions checkbox (requiredTrue)
    });
  }

  /**
   * Displays the terms and conditions modal dialog.
   */
  showTermsDialog(): void {
    this.termsVisible = true;
  }

  /**
   * Custom validator to check if confirmPassword matches password.
   * @param control AbstractControl for the confirmPassword field.
   * @returns ValidationErrors or null
   */
  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.root?.get('password')?.value; // Get the password field value
    const confirmPassword = control.value; // Get the confirmPassword field value

    if (password && confirmPassword && password !== confirmPassword) {
      return { noMatch: true }; // Return an error if passwords don't match
    }

    return null; // Return null if passwords match
  }

  /**
   * Getter for form controls.
   * Provides easier access to form fields in the template.
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggles password visibility.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handles form submission.
   * Sends the form data to the backend if the form is valid.
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value; // Get form data
      console.log('Form Data before submitting:', formData); // Log form data for debugging

      // Ensure that dob is formatted as 'yyyy-MM-dd'
      const dob = new Date(formData.dob);
      const formattedDob = dob.toISOString().split('T')[0]; // Convert to 'yyyy-MM-dd'
      formData.dob = formattedDob;

      // Send the form data to the backend
      this.http.post<any>('http://localhost:8080/users', formData).subscribe({
        next: (res) => {
          console.log('Registration successful', res); // Log success message
          alert(res.message); // Show success message to the user
          this.router.navigate(['/login']); // Navigate to the login page
        },
        error: (err) => {
          console.error('Registration failed', err); // Log error message
          if (err.error && err.error.message) {
            // Show error message in the UI
            this.messageService.add({
              severity: 'error',
              summary: 'Registration Failed',
              detail: err.error.message
            });
            alert(err.error.message); // Alert the error message
          }
        }
      });
    } else {
      // Show validation error message in the UI
      this.messageService.add({
        severity: 'error',
        summary: 'Form Invalid',
        detail: 'Please fill all the required fields correctly.'
      });
      alert('Please fill all the required fields correctly.'); // Alert the validation error
    }
  }
}
