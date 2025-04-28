import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStatusService {
  loginStatus = signal(false);
  userRole = signal<
    'Admin' | 'SchoolSuperAdmin' | 'Instructor' | 'Student' | undefined
  >(undefined);

  constructor() {}
}
