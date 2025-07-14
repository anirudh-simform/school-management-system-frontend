import { QueryParams } from '../../../shared/models/shared.model';

export type CourseResponse = {
  courses: { name: string; id: number; description: string }[];
  totalCount: number;
};

export type Course = {
  name: string;
  id: number;
  description: string;
};

export type CourseQueryParams = {
  name: string;
} & Partial<QueryParams>;

export type CreateCourseResponse = {
  created: Course;
};

export type UpdateCourseResponse = {
  updated: Course;
};

export type DeleteCourseResponse = {
  deleted: Course;
};

export type CreateCourseDto = {
  name: string;
  description: string;
};
