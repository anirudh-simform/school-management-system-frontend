import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../../../shared/BaseCRUDService/BaseCRUDService';
import {
  InstructorQueryParams,
  CreateInstructorDto,
  Instructor,
} from '../user-mangement-instructor.model';

@Injectable({
  providedIn: 'root',
})
export class InstructorService extends BaseCRUDService<
  InstructorQueryParams,
  Instructor,
  CreateInstructorDto
> {
  constructor() {
    super();
    this.endPoint = 'instructor';
  }
}
