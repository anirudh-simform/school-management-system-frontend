import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../../../app.config';
import { BaseCRUDService } from '../../../../shared/BaseCRUDService/BaseCRUDService';
import {
  DepartmentQueryParams,
  CreateDepartmentDto,
  Department,
} from '../department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends BaseCRUDService<
  DepartmentQueryParams,
  Department,
  CreateDepartmentDto
> {
  // private baseUrl = inject(BASE_URL);
  // private http = inject(HttpClient);
  // constructor() {}
  // getAllDepartments() {
  //   return this.http.get<{ id: number; name: string }[]>(
  //     this.baseUrl + '/department',
  //     { withCredentials: true }
  //   );
  // }
  // createDepartment(body: { name: string }) {
  //   return this.http.post<{
  //     message: string;
  //     departments: { id: number; name: string }[];
  //     createdDepartment: { id: number; name: string };
  //   }>(this.baseUrl + '/department', body, { withCredentials: true });
  // }
  // editDepartment(id: number, body: { name: string }) {
  //   return this.http.put<{
  //     message: string;
  //     departments: { id: number; name: string }[];
  //     createdDepartment: { id: number; name: string };
  //   }>(this.baseUrl + `/department/${id}`, body, { withCredentials: true });
  // }
  // deleteDepartment(id: number) {
  //   return this.http.delete<{
  //     message: string;
  //     departments: { id: number; name: string }[];
  //     createdDepartment: { id: number; name: string };
  //   }>(this.baseUrl + `/department/${id}`, { withCredentials: true });
  // }

  constructor() {
    super();
    this.endPoint = 'department';
  }
}
