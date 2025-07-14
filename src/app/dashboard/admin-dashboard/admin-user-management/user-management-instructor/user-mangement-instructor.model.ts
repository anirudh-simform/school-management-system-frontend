import { QueryParams } from '../../../shared/models/shared.model';

export type CreateInstructorDto = {
  firstname: string;
  lastname: string;
  email: string;
  dob: Date;
  gender: 'Male' | 'Female';
  phone: string;
  department: number;
};

export type Instructor = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  dob: Date;
  gender: 'Male' | 'Female';
  phone: string;
  department: number;
};

export type InstructorQueryParams = {
  query: string;
} & Partial<QueryParams>;
