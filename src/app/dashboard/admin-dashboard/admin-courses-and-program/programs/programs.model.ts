import { QueryParams } from '../../../shared/models/shared.model';
import { Course } from '../courses/courses.model';

export type CreateProgramDto = {
  name: string;
  description: string;
  courses: number[];
};

export type Program = {
  id: number;
  name: string;
  description: string;
  courses: Course[];
};

export type GetAllProgramsResponse = {
  programs: {
    id: number;
    name: string;
    description: string;
    courses: {
      name: string;
      id: number;
      description: string;
      schoolId: number;
      createdAt: Date;
      updatedAt: Date;
    }[];
  }[];
  totalCount: number;
};

export type ProgramQueryParams = {
  name: string;
} & Partial<QueryParams>;
