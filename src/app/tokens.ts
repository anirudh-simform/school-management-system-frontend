import { CourseService } from './dashboard/admin-dashboard/admin-courses-and-program/courses/service/course.service';
import { InjectionToken } from '@angular/core';

export const COURSE_SERVICE_TOKEN = new InjectionToken<CourseService>(
  'COURSE_SERVICE_TOKEN'
);
