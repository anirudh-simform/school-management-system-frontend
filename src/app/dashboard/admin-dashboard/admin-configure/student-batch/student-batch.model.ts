type GetAllStudentBatchesResponse = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  program: {
    id: number;
    name: string;
  };
}[];

type StudentBatch = {
  name: string;
  id: number;
  startDate: Date;
  endDate: Date;
  programId: number;
  schoolId: number;
};

type StudentBatchCreateResponse = {
  message: string;
  studentBatch: StudentBatch;
  studentBatches: GetAllStudentBatchesResponse;
};

type StudentBatchUpdateResponse = {
  message: string;
  updatedStudentBatch: StudentBatch;
  studentBatches: GetAllStudentBatchesResponse;
};

type StudentBatchDeletedResponse = {
  message: string;
  deletedStudentBatch: StudentBatch;
  studentBatches: GetAllStudentBatchesResponse;
};

type StudentBatchRequest = {
  name: string;
  startDate: Date;
  endDate: Date;
  programId: number;
};

export {
  type GetAllStudentBatchesResponse,
  type StudentBatchCreateResponse,
  type StudentBatchRequest,
  type StudentBatchUpdateResponse,
  type StudentBatchDeletedResponse,
};
