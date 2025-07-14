import { QueryParams } from '../../../shared/models/shared.model';

export type CreateDepartmentDto = {
  name: string;
};

export type Department = {
  id: number;
  name: string;
};

export type DepartmentQueryParams = {
  query: string;
} & Partial<QueryParams>;
