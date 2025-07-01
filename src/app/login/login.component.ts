import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStatusService } from '../auth-status.service';
import { Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(AuthService);
  wrongPassword = false;
  loginForm = this.formBuilder.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required, Validators.minLength(6)],
      },
    ],
  });
  private authService = inject(AuthStatusService);

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.http
        .login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status == 401 || error.status == 400) {
              this.wrongPassword = true;
              this.loginForm.reset();
            }
            throw error;
          })
        )
        // TODO: Implement other user types
        .subscribe({
          next: (res) => {
            if (res.ok) {
              switch (res.body?.userDetails.role) {
                case 'SchoolSuperAdmin':
                  this.router.navigate(['dashboard']);
                  this.authService.loginStatus.set(true);
                  this.authService.userRole.set(res.body.userDetails.role);
                  break;
              }
            }
          },
        });
    }
  }
}
