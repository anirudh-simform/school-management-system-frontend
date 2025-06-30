import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../../app.config';
import {
  AddStudentRequest,
  AddAdminRequest,
} from '../user-management-student/user-management-student.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = inject(BASE_URL);

  private http = inject(HttpClient);
  constructor() {}

  createStudent(body: AddStudentRequest) {
    return this.http.post(this.baseUrl + '/user', body, {
      withCredentials: true,
    });
  }

  createAdmin(body: AddAdminRequest) {
    return this.http.post(this.baseUrl + '/user', body, {
      withCredentials: true,
    });
  }
}
