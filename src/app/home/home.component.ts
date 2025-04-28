import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStatusService } from '../auth-status.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  authStatusService = inject(AuthStatusService);
  private http = inject(HttpService);

  ngOnInit(): void {
    this.http.authCheck().subscribe({
      next: (response) => {
        this.authStatusService.loginStatus.set(true);
        this.authStatusService.userRole.set(response.role);
      },
      error: (err) => {
        this.authStatusService.loginStatus.set(false);
        console.log('User Not Logged In', err);
      },
    });
  }

  onLogout() {
    this.http.logout();
  }
}
