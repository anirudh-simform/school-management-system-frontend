import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../../../shared/BaseCRUDService/BaseCRUDService';
import {
  StudentQueryParms,
  Student,
  CreateStudentDto,
} from '../user-management-student.model';
@Injectable({
  providedIn: 'root',
})
export class StudentService extends BaseCRUDService<
  StudentQueryParms,
  Student,
  CreateStudentDto
> {
  constructor() {
    super();
    this.endPoint = 'student';
  }
}
