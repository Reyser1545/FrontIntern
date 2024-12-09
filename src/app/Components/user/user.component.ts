import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Ensure HttpClientModule is here
import { UserInfo } from '../../Services/Userinfo.service';
import { Usermodel } from '../../Model/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//primeNG
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';  // Import the Breadcrumb module
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule,ReactiveFormsModule,
  ButtonModule,BreadcrumbModule,TableModule
  ],  // Add HttpClientModule here
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  // Corrected styleUrls (not styleUrl)
})
export class UserComponent implements OnInit{
  userList: Usermodel[] = [];
  editMode: boolean = false;
  searchQuery: string = '';  // Store the search query
  filteredUserList: Usermodel[] = [];
  userForm: FormGroup;
  items: any[] | undefined;

  user: Usermodel = {
    department: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",  // Male by default (false is Female, true is Male)
    doj: "",
    city: "",
    salary: 0,
    address: "",
    status: "",  // Inactive by default (false is Inactive, true is Active)
  };
//set validator requirement
  constructor(private _userService: UserInfo, private _toastrService: ToastrService, private router: Router, private fb: FormBuilder) {
    // Initialize the form group with validation
    this.userForm = this.fb.group({
      department: ['', Validators.required],
      name: ['', Validators.required,],
      mobile: ['', Validators.required,], 
      email: ['', Validators.required,],  // Email validation
      doj: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      salary: [0 ,Validators.required], 
      address: ['', Validators.required],  
      status: [false, Validators.required]
    });
    this.items = [
      { label: 'Mainpage', icon: 'pi pi-home', routerLink: ['/mainpage'] },
      { label: 'Userpage', routerLink: ['/user'] },
    ];
  }
    
  // Inject UserInfo service

  CityList: string[] = ["Bangkok", "Seoul", "Tokyo", "Barcelona", "London"];
  departmentList: string[] = ["IT", "HR", "Accounts", "Sales", "Management"];

  ngOnInit(): void {
    this.getUserList();

  }

  getUserList() {
    this._userService.getUsers().subscribe((res) => {
      this.userList = res;
      this.filteredUserList = res;  // Direct assignment ensures filteredUserList matches the fetched data
    });
  }
  

  onSubmit(form: NgForm): void {
    // Ensure that gender and status have default values before saving
    if (this.user.gender === "") {
      this.user.gender = "Male";  // Default to Male if not selected
    }
    if (this.user.status === "") {
      this.user.status = "Active";  // Default to Active if not selected
    }
  
    if (this.editMode) {
      this._userService.updateUser(this.user).subscribe((res) => {
        this.getUserList();
        this.editMode = false;
        form.reset();
        this._toastrService.success('User Updated', 'Success');
      });
    } else {
      this._userService.addUser(this.user).subscribe((res) => {
        this.getUserList();
        form.reset();
        this._toastrService.success('User Added', 'Success');
      });
    }
  }
  

  onEdit(userdata: Usermodel): void {
    // Edit functionality here
    this.user = userdata
    this.editMode = true;
  }

  onDelete(id: any){
    // Delete functionality here
    const isConfrim = confirm('Are you Sure');
    if (isConfrim){
    this._userService.deleteUser(id).subscribe((res)=>{
      this._toastrService.error('User Deleted Succesfully','Deleted')
      this.getUserList();
    });
  }
}

  onRestForm(form : NgForm): void {
    // Reset form fields here
    form.reset();
    this.editMode = false;
    this.getUserList();
  }

  goBack(): void {
    this.router.navigate(['/mainpage']);
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredUserList = [...this.userList];  // Fresh copy of the user list
    } else {
      this.filteredUserList = this.userList.filter(user => 
        // Search by name
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        // Search by department
        user.department.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        // Search by mobile (ensure the search query can match mobile numbers)
        user.mobile.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  

  trackByIndex(index: number, item: any): number {
    return index;  // Just return the index as the identifier for simplicity
  }
}
