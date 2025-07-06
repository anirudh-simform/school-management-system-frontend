import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../../../shared/BaseCRUDService/BaseCRUDService';
import {
  GradeLevelQueryParams,
  GradeLevel,
  GradeLevelCreateDto,
} from '../grade-level.model';

@Injectable({
  providedIn: 'root',
})
export class GradeLevelService extends BaseCRUDService<
  GradeLevelQueryParams,
  GradeLevel,
  GradeLevelCreateDto
> {
  constructor() {
    super();
    this.endPoint = 'gradeLevel';
  }
}
