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
import { AdminCoursesAndProgramComponent } from './dashboard/admin-dashboard/admin-courses-and-program/admin-courses-and-program.component';
import { CoursesAndProgramsOverviewComponent } from './dashboard/admin-dashboard/admin-courses-and-program/courses-and-programs-overview/courses-and-programs-overview.component';
import { CoursesComponent } from './dashboard/admin-dashboard/admin-courses-and-program/courses/courses.component';
import { ProgramsComponent } from './dashboard/admin-dashboard/admin-courses-and-program/programs/programs.component';
import { AdminUserManagementComponent } from './dashboard/admin-dashboard/admin-user-management/admin-user-management.component';
import { UserManagementOverviewComponent } from './dashboard/admin-dashboard/admin-user-management/user-management-overview/user-management-overview.component';
import { StudentBatchComponent } from './dashboard/admin-dashboard/admin-configure/student-batch/student-batch.component';
import { UserManagementStudentComponent } from './dashboard/admin-dashboard/admin-user-management/user-management-student/user-management-student.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminDashboardPageComponent },
      {
        path: 'configure',
        component: AdminConfigureComponent,
        children: [
          {
            path: '',
            component: ConfigurationOverviewComponent,
          },
          { path: 'department', component: DepartmentComponent },
          { path: 'student-batch', component: StudentBatchComponent },
        ],
      },
      {
        path: 'courses-and-programs',
        component: AdminCoursesAndProgramComponent,
        children: [
          { path: '', component: CoursesAndProgramsOverviewComponent },
          { path: 'courses', component: CoursesComponent },
          { path: 'programs', component: ProgramsComponent },
        ],
      },
      {
        path: 'user-management',
        component: AdminUserManagementComponent,
        children: [
          { path: '', component: UserManagementOverviewComponent },
          { path: 'student', component: UserManagementStudentComponent },
        ],
      },
    ],
  },
  { path: 'autherror', component: UnauthenticatedComponent },
];
