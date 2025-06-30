import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../../../app.config';
import {
  GetAllStudentBatchesResponse,
  StudentBatchRequest,
  StudentBatchCreateResponse,
  StudentBatchUpdateResponse,
  StudentBatchDeletedResponse,
} from '../student-batch.model';

@Injectable({
  providedIn: 'root',
})
export class StudentBatchService {
  private baseUrl = inject(BASE_URL);

  private http = inject(HttpClient);
  constructor() {}

  getAllStudentBatches() {
    return this.http.get<GetAllStudentBatchesResponse>(
      this.baseUrl + '/studentBatch/',
      { withCredentials: true }
    );
  }

  createStudentBatch(body: StudentBatchRequest) {
    console.log('inside student batch');
    return this.http.post<StudentBatchCreateResponse>(
      this.baseUrl + '/studentBatch/',
      body,
      { withCredentials: true }
    );
  }

  editStudentBatch(id: number, body: StudentBatchRequest) {
    console.log(this.baseUrl + `/studentBatch/${id}`);
    return this.http.put<StudentBatchUpdateResponse>(
      this.baseUrl + `/studentBatch/${id}`,
      body,
      { withCredentials: true }
    );
  }

  deleteStudentBatch(id: number) {
    return this.http.delete<StudentBatchDeletedResponse>(
      this.baseUrl + `/studentBatch/${id}`,
      { withCredentials: true }
    );
  }
}
