import { CourseService } from './dashboard/admin-dashboard/admin-courses-and-program/courses/service/course.service';
import { ProgramService } from './dashboard/admin-dashboard/admin-courses-and-program/programs/service/program.service';
import { GradeLevelService } from './dashboard/admin-dashboard/admin-configure/grade-level/services/grade-level.service';
import { InjectionToken } from '@angular/core';
import { StudentBatchService } from './dashboard/admin-dashboard/admin-configure/student-batch/service/student-batch.service';
import { StudentService } from './dashboard/admin-dashboard/admin-user-management/user-management-student/services/student.service';
import { DepartmentService } from './dashboard/admin-dashboard/admin-configure/department/service/department.service';
import { InstructorService } from './dashboard/admin-dashboard/admin-user-management/user-management-instructor/services/instructor.service';
import { AdminService } from './dashboard/admin-dashboard/admin-user-management/user-management-admin/services/admin.service';
export const COURSE_SERVICE_TOKEN = new InjectionToken<CourseService>(
  'COURSE_SERVICE_TOKEN'
);

export const PROGRAM_SERVICE_TOKEN = new InjectionToken<ProgramService>(
  'PROGRAM_SERVICE_TOKEN'
);

export const GRADE_LEVEL_SERVICE_TOKEN = new InjectionToken<GradeLevelService>(
  'GRADE_LEVEL_SERVICE_TOKEN'
);

export const STUDENT_BATCH_SERVICE_TOKEN =
  new InjectionToken<StudentBatchService>('STUDENT_BATCH_SERVICE_TOKEN');

export const STUDENT_SERVICE_TOKEN = new InjectionToken<StudentService>(
  'STUDENT_SERVICE_TOKEN'
);

export const DEPARTMENT_SERVICE_TOKEN = new InjectionToken<DepartmentService>(
  'DEPARTMENT_SERVICE_TOKEN'
);

export const INSTRUCTOR_SERVICE_TOKEN = new InjectionToken<InstructorService>(
  'INSTRUCTOR_SERVICE_TOKEN'
);

export const ADMIN_SERVICE_TOKEN = new InjectionToken<AdminService>(
  'ADMIN_SERVICE_TOKEN'
);
