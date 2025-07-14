import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverviewItemComponent } from '../../../../overview-item/overview-item.component';

@Component({
  selector: 'app-user-management-overview',
  imports: [RouterLink, OverviewItemComponent],
  templateUrl: './user-management-overview.component.html',
  styleUrl: './user-management-overview.component.css',
})
export class UserManagementOverviewComponent {}
