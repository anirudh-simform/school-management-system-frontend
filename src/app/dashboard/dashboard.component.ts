import { Component, inject } from '@angular/core';
import { AuthStatusService } from '../auth-status.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UnauthenticatedComponent } from '../unauthenticated/unauthenticated.component';

@Component({
  selector: 'app-dashboard',
  imports: [AdminDashboardComponent, UnauthenticatedComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  authService = inject(AuthStatusService);
}
