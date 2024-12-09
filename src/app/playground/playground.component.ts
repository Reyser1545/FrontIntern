import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Import RouterModule for routing
import { GalleriaModule } from 'primeng/galleria';
import { AccordionModule } from 'primeng/accordion';
import { UserService } from '../../user.service'; // Custom service to manage user data

// Import Videogular Modules
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api'; // Import MenuItem type for menu items
import { BreadcrumbModule } from 'primeng/breadcrumb';
// Import PrimeNG Card Module
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CardModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    GalleriaModule,
    AccordionModule,
    MenubarModule,
    BreadcrumbModule,

  ],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']  // Fixed styleUrls (changed from styleUrl)
})
export class PlaygroundComponent implements OnInit {
  videoSource = 'assets/video/MooDeng.mp4'; // Ensure correct relative path for assets
  items: MenuItem[] | undefined; // Array to store menu items
  
  currentUser: string | null = null;
  isAdmin: boolean = false;


 



  @ViewChild('media') media!: ElementRef<HTMLVideoElement>; // Use non-null assertion here

  images = [
    {
      itemImageSrc: '/assets/galleria12.jpg',
      thumbnailImageSrc: '/assets/galleria12.jpg'
    },
    {
      itemImageSrc: '/assets/galleria13.jpg',
      thumbnailImageSrc: '/assets/galleria13.jpg'
    },
    {
      itemImageSrc: '/assets/galleria11.jpg',
      thumbnailImageSrc: '/assets/galleria11.jpg'
    }
  ];

  videoItems = [
    {
      videoSrc: 'assets/video/MooDeng.mp4',
      thumbnailSrc: 'assets/video/Moodeng.mp4'  
    },
    {
      videoSrc: 'assets/video/Gumi.mp4',
      thumbnailSrc: 'assets/video/Gumi.mp4'
    },
    {
      videoSrc: 'assets/video/Cockatoo.mp4',
      thumbnailSrc: 'assets/video/Cocktaoo.mp4'
    },
  ];
  

  // Define responsive options for different screen sizes
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      orientation: 'horizontal',
      gutter: 10
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      orientation: 'vertical',
      gutter: 8
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      orientation: 'vertical',
      gutter: 5
    }
  ];

  // Initially, set the first video as the selected video
  selectedVideo = this.videoItems[0];

  constructor(private userService: UserService,) {this.items = [
    { label: 'Mainpage', icon: 'pi pi-home', routerLink: ['/mainpage'] },
    { label: 'Playground'}
  ]

}
setUser(user: any) {
  if (user === null) {
    sessionStorage.removeItem('user'); // Remove user from sessionStorage when null is passed
  } else {
    sessionStorage.setItem('user', JSON.stringify(user)); // Store user as a string when it's not null
  }
}

getUser() {
  this.currentUser = this.userService.gettingUser();
  alert(`Current User: ${this.currentUser}`);
}

checkAdmin() {
  this.isAdmin = this.userService.isAdmin();
  alert(`Is Admin: ${this.isAdmin}`);
}
  ngOnInit(): void {
    // Add any initialization logic if needed
  }

  // Method to handle the value change event (optional, can be used for other functionality)
  onValueChange(event: any) {
    console.log('Gallery value changed:', event);
  }

  // Method to handle video selection when clicking a thumbnail
  selectVideo(item: any) {
    this.selectedVideo = item;
    console.log('Selected video:', item);
  }
}
