import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../../../shared/BaseCRUDService/BaseCRUDService';
import {
  StudentBatchQueryParams,
  StudentBatch,
  StudentBatchCreateDto,
} from '../student-batch.model';

@Injectable({
  providedIn: 'root',
})
export class StudentBatchService extends BaseCRUDService<
  StudentBatchQueryParams,
  StudentBatch,
  StudentBatchCreateDto
> {
  // private baseUrl = inject(BASE_URL);
  // private http = inject(HttpClient);
  // constructor() {}
  // getAllStudentBatches() {
  //   return this.http.get<GetAllStudentBatchesResponse>(
  //     this.baseUrl + '/studentBatch/',
  //     { withCredentials: true }
  //   );
  // }
  // createStudentBatch(body: StudentBatchRequest) {
  //   console.log('inside student batch');
  //   return this.http.post<StudentBatchCreateResponse>(
  //     this.baseUrl + '/studentBatch/',
  //     body,
  //     { withCredentials: true }
  //   );
  // }
  // editStudentBatch(id: number, body: StudentBatchRequest) {
  //   console.log(this.baseUrl + `/studentBatch/${id}`);
  //   return this.http.put<StudentBatchUpdateResponse>(
  //     this.baseUrl + `/studentBatch/${id}`,
  //     body,
  //     { withCredentials: true }
  //   );
  // }
  // deleteStudentBatch(id: number) {
  //   return this.http.delete<StudentBatchDeletedResponse>(
  //     this.baseUrl + `/studentBatch/${id}`,
  //     { withCredentials: true }
  //   );
  // }

  constructor() {
    super();
    this.endPoint = 'studentBatch';
  }
}
