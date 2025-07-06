import { QueryParams } from '../../../shared/models/shared.model';
export type StudentBatch = {
  name: string;
  id: number;
  startDate: Date;
  endDate: Date;
  program: { id: number; name: string };
  gradeLevel: { id: number; name: string };
};

export type StudentBatchCreateDto = {
  name: string;
  startDate: Date;
  endDate: Date;
  programId: number;
  gradeLevelId: number;
};

export type StudentBatchQueryParams = {
  query: string;
} & Partial<QueryParams>;
