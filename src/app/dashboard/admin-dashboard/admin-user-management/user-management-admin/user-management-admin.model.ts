import { QueryParams } from '../../../shared/models/shared.model';

export type CreateAdminDto = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dob: Date;
  gender: 'Male' | 'Female';
  phone: string;
};

export type Admin = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dob: Date;
  gender: 'Male' | 'Female';
  phone: string;
};

export type AdminQueryParms = {
  query: string;
} & Partial<QueryParams>;
