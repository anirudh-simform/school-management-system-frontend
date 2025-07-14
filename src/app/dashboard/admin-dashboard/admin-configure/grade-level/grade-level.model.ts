import { QueryParams } from '../../../shared/models/shared.model';
export type GradeLevelQueryParams = {
  query: string;
} & Partial<QueryParams>;

export type GradeLevel = {
  id: number;
  name: string;
  levelOrder: number;
};

export type GradeLevelCreateDto = {
  name: string;
  levelOrder: number;
};
