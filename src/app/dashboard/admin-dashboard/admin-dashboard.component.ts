import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { HttpService } from '../../http.service';
import { AdminDashboardPageComponent } from './admin-dashboard-page/admin-dashboard-page.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    RouterLink,
    AdminDashboardPageComponent,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  private http = inject(HttpService);

  onLogout() {
    this.http.logout();
  }
}
