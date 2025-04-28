import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UnauthenticatedComponent } from './unauthenticated/unauthenticated.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { AdminConfigureComponent } from './dashboard/admin-dashboard/admin-configure/admin-configure.component';
import { AdminDashboardPageComponent } from './dashboard/admin-dashboard/admin-dashboard-page/admin-dashboard-page.component';
import { DepartmentComponent } from './dashboard/admin-dashboard/admin-configure/department/department.component';
import { ConfigurationOverviewComponent } from './dashboard/admin-dashboard/admin-configure/configuration-overview/configuration-overview.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'configure',
        component: AdminConfigureComponent,
        children: [
          {
            path: '',
            component: ConfigurationOverviewComponent,
          },
          { path: 'department', component: DepartmentComponent },
        ],
      },
      { path: '', component: AdminDashboardPageComponent },
    ],
  },
  { path: 'autherror', component: UnauthenticatedComponent },
];
