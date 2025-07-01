import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AdminDashboardPageComponent } from './admin-dashboard-page/admin-dashboard-page.component';
import { AuthService } from '../../auth.service';

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
  private http = inject(AuthService);

  onLogout() {
    this.http.logout();
  }
}
