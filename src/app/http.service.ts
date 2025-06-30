import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStatusService } from './auth-status.service';
import { Router } from '@angular/router';

import { type ProgramRequest } from './dashboard/admin-dashboard/admin-courses-and-program/programs/programs.model';
import { type ProgramResponse } from './dashboard/admin-dashboard/admin-courses-and-program/programs/programs.model';
import { type CourseResponse } from './dashboard/admin-dashboard/admin-courses-and-program/courses/courses.model';
import { type UpdateProgramResponse } from './dashboard/admin-dashboard/admin-courses-and-program/programs/programs.model';
import { type deletedProgramResponse } from './dashboard/admin-dashboard/admin-courses-and-program/programs/programs.model';
import { type GetAllStudentBatchesResponse } from './dashboard/admin-dashboard/admin-configure/student-batch/student-batch.model';
import { type StudentBatchCreateResponse } from './dashboard/admin-dashboard/admin-configure/student-batch/student-batch.model';
import { type StudentBatchRequest } from './dashboard/admin-dashboard/admin-configure/student-batch/student-batch.model';
import { type StudentBatchUpdateResponse } from './dashboard/admin-dashboard/admin-configure/student-batch/student-batch.model';
import { type StudentBatchDeletedResponse } from './dashboard/admin-dashboard/admin-configure/student-batch/student-batch.model';
import {
  AddAdminRequest,
  type AddStudentRequest,
} from './dashboard/admin-dashboard/admin-user-management/user-management-student/user-management-student.model';

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

  getAllCourses() {
    return this.http.get<CourseResponse>(this.baseUrl + '/course', {
      withCredentials: true,
    });
  }

  createCourse(body: { name: string; description: string }) {
    return this.http.post<{
      message: string;
      courses: { id: number; name: string; description: string }[];
      createdCourse: { id: number; name: string; description: string };
    }>(this.baseUrl + '/course', body, { withCredentials: true });
  }

  editCourse(id: number, body: { name: string; description: string }) {
    return this.http.put<{
      message: string;
      courses: { id: number; name: string; description: string }[];
      updatedCourse: { id: number; name: string; description: string };
    }>(this.baseUrl + `/course/${id}`, body, { withCredentials: true });
  }

  deleteCourse(id: number) {
    return this.http.delete<{
      message: string;
      courses: { id: number; name: string; description: string }[];
      deletedCourse: { id: number; name: string; description: string };
    }>(this.baseUrl + `/course/${id}`, { withCredentials: true });
  }

  createProgram(body: ProgramRequest) {
    return this.http.post<ProgramResponse>(this.baseUrl + '/program', body, {
      withCredentials: true,
    });
  }

  getAllPrograms() {
    return this.http.get<ProgramResponse['programs']>(
      this.baseUrl + '/program',
      { withCredentials: true }
    );
  }

  editProgram(id: number, body: ProgramRequest) {
    return this.http.put<UpdateProgramResponse>(
      this.baseUrl + `/program/${id}`,
      body,
      { withCredentials: true }
    );
  }

  deleteProgram(id: number) {
    return this.http.delete<deletedProgramResponse>(
      this.baseUrl + `/program/${id}`,
      { withCredentials: true }
    );
  }

  getAllStudentBatches() {
    return this.http.get<GetAllStudentBatchesResponse>(
      this.baseUrl + '/studentBatch/',
      { withCredentials: true }
    );
  }

  createStudentBatch(body: StudentBatchRequest) {
    console.log('inside student batch');
    return this.http.post<StudentBatchCreateResponse>(
      this.baseUrl + '/studentBatch/',
      body,
      { withCredentials: true }
    );
  }

  editStudentBatch(id: number, body: StudentBatchRequest) {
    console.log(this.baseUrl + `/studentBatch/${id}`);
    return this.http.put<StudentBatchUpdateResponse>(
      this.baseUrl + `/studentBatch/${id}`,
      body,
      { withCredentials: true }
    );
  }

  deleteStudentBatch(id: number) {
    return this.http.delete<StudentBatchDeletedResponse>(
      this.baseUrl + `/studentBatch/${id}`,
      { withCredentials: true }
    );
  }

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
