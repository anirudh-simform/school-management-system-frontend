import { QueryParams } from '../../../shared/models/shared.model';
import { Gender, Role } from '../admin-user-management.model';

export type CreateStudentDto = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dob: Date;
  gender: 'Male' | 'Female';
  phone: string;
  studentBatch: number;
  gradeLevel: number;
};

export type Student = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dob: Date;
  gender: 'Male' | 'Female';
  phone: string;
  studentBatch: { id: number; name: string };
  gradeLevel: {
    id: number;
    name: string;
  };
};

export type StudentQueryParms = {
  query: string;
} & Partial<QueryParams>;
