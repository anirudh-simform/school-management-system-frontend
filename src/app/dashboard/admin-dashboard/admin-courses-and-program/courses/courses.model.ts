import { QueryParams } from '../../../shared/models/shared.model';

export type CourseResponse = {
  courses: { name: string; id: number; description: string }[];
  totalCount: number;
};

export type CourseQueryParams = {
  name: string;
} & QueryParams;
