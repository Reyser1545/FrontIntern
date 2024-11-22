import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Import RouterModule and RouterOutlet
import { routes } from './app.routes';  // Import routes array

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],  // Include RouterModule directly
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-example';
}
