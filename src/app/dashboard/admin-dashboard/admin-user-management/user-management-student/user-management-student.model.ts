import { Gender, Role } from '../admin-user-management.model';

export type AddStudentRequest = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  dob: Date;
  gender: Gender;
  role: Role;
  password: string;
  studentProfile: {
    studentBatchId: number;
  };
};

export type AddAdminRequest = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  dob: Date;
  gender: Gender;
  role: Role;
  password: string;
};
