import { QueryParams } from '../../../shared/models/shared.model';

export type CreateProgramDto = {
  name: string;
  description: string;
  courses: number[];
};

export type UpdateProgramDto = CreateProgramDto;

export type CourseFilterEvent = {
  originalEvent: Event;
  query: string;
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

export type CreateProgramResponse = {
  message: string;
  createdProgram: {
    id: number;
    name: string;
    description: string;
  };
};
type UpdateProgramResponse = {
  message: string;
  updatedProgram: {
    id: number;
    name: string;
    description: string;
  };
};

type deletedProgramResponse = {
  message: string;
  deletedProgram: {
    id: number;
    name: string;
    description: string;
  };
};

export { type UpdateProgramResponse, type deletedProgramResponse };
