import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';  // Add Router for navigation after logout
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  orderReportForm!: FormGroup;  // Add the `!` to assert that the form will be initialized

  constructor(private http: HttpClient, 
              private router: Router, 
              private fb: FormBuilder) {}

              ngOnInit(): void {
                // Define the form with default values and validation
                this.orderReportForm = this.fb.group({
                  regis_type: ['', Validators.required],
                  regis_id: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Ensures numeric input
                  company_name: ['', Validators.required],
                  purpose: ['', Validators.required],
                  product_type: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Ensures numeric input
                  ref_no: [null, [Validators.required, Validators.pattern('^[0-9]*$')]], // Ensures numeric input
                  inquiry: ['', Validators.required], // Default value set to 1
                  flag: ['', Validators.required],
                  language: ['', Validators.required]
                });
              }
  logout(): void {
    const authToken = localStorage.getItem('authToken');
    console.log('Authorization Header:', `Bearer ${authToken}`);
  
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      });
  
      const payload = {
        token: authToken, // Include the token in the request body
      };
  
      this.http.post<any>('http://192.168.63.141:28080/h2hclient/logout', payload, { headers })
        .subscribe({
          next: () => {
            console.log('Logout successful');
            localStorage.removeItem('authToken');
            this.router.navigate(['']);
          },
          error: (err) => {
            console.error('Logout failed:', err);
            console.log('Response status:', err.status);
            console.log('Response body:', err.error);
          }
        });
    } else {
      console.log('No auth token found');
    }
  }
  onOrderReportSubmit(): void {
    if (this.orderReportForm.valid) {
      let formData = this.orderReportForm.value;  // Capture the form data
      const authToken = localStorage.getItem('authToken');
      
      // Log the form data for debugging
      console.log('Form Data before sending:', formData);
      
      // Check if the auth token exists
      if (authToken) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Add Authorization header
        });
    
        // Prepare the payload (with correct types)
        const payload = {
          token: authToken,
          ...formData,  // Spread the form data directly
        };
      
        // Detailed logging for the request
        console.log('--- Request Details ---');
        console.log('Request Method: POST');
        console.log('Request URL:', 'http://192.168.63.141:28080/h2hclient/order-report');
        
        // Log headers
        console.log('Request Headers:');
        headers.keys().forEach((key) => {
          console.log(`${key}: ${headers.get(key)}`);
        });
        
        // Log payload without stringifying it, as HttpClient will handle it
        console.log('Request Payload:', payload);
      
        // Send the HTTP request with the JSON payload
        this.http.post<any>('http://192.168.63.141:28080/h2hclient/order-report', payload, { headers })
          .subscribe({
            next: (response) => {
              console.log('Order Report Submission Successful:', response);
              alert('Order report submitted successfully.');
            },
            error: (err) => {
              // Log the error in detail
              console.error('Order Report Submission Failed:', err);
              console.log('Response status:', err.status); // Log the response status
              console.log('Response body:', err.error);   // Log the response body
              alert('Failed to submit the order report. Please try again.');
            }
          });
      } else {
        console.log('No auth token found');
        alert('You must be logged in to submit the order report.');
      }
    } else {
      console.log('Form is not valid');
      alert('Please fill in all required fields correctly.');
    }
  }
}  