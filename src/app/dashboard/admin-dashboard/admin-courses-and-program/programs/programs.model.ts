type ProgramRequest = {
  name: string;
  description: string;
  courses: { id: number }[];
};

type ProgramResponse = {
  message: string;
  createdProgram: {
    id: number;
    name: string;
    description: string;
  };
  programs: {
    id: number;
    name: string;
    description: string;
    courses: {
      name: string;
      id: number;
      description: string;
      schoolId: number;
    }[];
  }[];
};

type UpdateProgramResponse = {
  message: string;
  updatedProgram: {
    id: number;
    name: string;
    description: string;
  };
  programs: {
    id: number;
    name: string;
    description: string;
    courses: {
      name: string;
      id: number;
      description: string;
      schoolId: number;
    }[];
  }[];
};

type deletedProgramResponse = {
  message: string;
  deletedProgram: {
    id: number;
    name: string;
    description: string;
  };
  programs: {
    id: number;
    name: string;
    description: string;
    courses: {
      name: string;
      id: number;
      description: string;
      schoolId: number;
    }[];
  }[];
};

export {
  type ProgramRequest,
  type ProgramResponse,
  type UpdateProgramResponse,
  type deletedProgramResponse,
};
