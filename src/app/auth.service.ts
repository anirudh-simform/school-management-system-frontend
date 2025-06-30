import { inject, Injectable } from '@angular/core';
import { BASE_URL } from './app.config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthStatusService } from './auth-status.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private baseUrl = inject(BASE_URL);

  private http = inject(HttpClient);
  private authStatusService = inject(AuthStatusService);
  private router = inject(Router);

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
}
