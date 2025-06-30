import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../../../app.config';
import {
  ProgramRequest,
  ProgramResponse,
  UpdateProgramResponse,
  deletedProgramResponse,
} from '../programs.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  private baseUrl = inject(BASE_URL);

  private http = inject(HttpClient);
  constructor() {}

  createProgram(body: ProgramRequest) {
    return this.http.post<ProgramResponse>(this.baseUrl + '/program', body, {
      withCredentials: true,
    });
  }

  getAllPrograms() {
    return this.http.get<ProgramResponse['programs']>(
      this.baseUrl + '/program',
      { withCredentials: true }
    );
  }

  editProgram(id: number, body: ProgramRequest) {
    return this.http.put<UpdateProgramResponse>(
      this.baseUrl + `/program/${id}`,
      body,
      { withCredentials: true }
    );
  }

  deleteProgram(id: number) {
    return this.http.delete<deletedProgramResponse>(
      this.baseUrl + `/program/${id}`,
      { withCredentials: true }
    );
  }
}
