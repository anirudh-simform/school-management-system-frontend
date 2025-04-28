import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStatusService } from './auth-status.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = 'http://localhost:8080';
  private http = inject(HttpClient);
  private authStatusService = inject(AuthStatusService);
  private router = inject(Router);
  constructor() {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{
      message: string;
      userDetails: { role: string; id: string; schoolId: number };
    }>(this.baseUrl + '/user/login', credentials, {
      observe: 'response',
      withCredentials: true,
    });
  }

  logout() {
    this.http
      .post(this.baseUrl + '/user/logout', '', {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe((response) => {
        if (response.ok) {
          this.authStatusService.loginStatus.set(false);
          this.router.navigate(['']);
        }
      });
  }

  authCheck() {
    return this.http.get<{
      role: 'Admin' | 'SchoolSuperAdmin' | 'Instructor' | 'Student' | undefined;
      id: string;
      schoolId: number;
    }>(this.baseUrl + '/user/me', {
      withCredentials: true,
    });
  }

  getAllDepartments() {
    return this.http.get<{ id: number; name: string }[]>(
      this.baseUrl + '/department',
      { withCredentials: true }
    );
  }

  createDepartment(body: { name: string }) {
    return this.http.post<{
      message: string;
      departments: { id: number; name: string }[];
      createdDepartment: { id: number; name: string };
    }>(this.baseUrl + '/department', body, { withCredentials: true });
  }

  editDepartment(id: number, body: { name: string }) {
    return this.http.put<{
      message: string;
      departments: { id: number; name: string }[];
      createdDepartment: { id: number; name: string };
    }>(this.baseUrl + `/department/${id}`, body, { withCredentials: true });
  }

  deleteDepartment(id: number) {
    return this.http.delete<{
      message: string;
      departments: { id: number; name: string }[];
      createdDepartment: { id: number; name: string };
    }>(this.baseUrl + `/department/${id}`, { withCredentials: true });
  }
}
