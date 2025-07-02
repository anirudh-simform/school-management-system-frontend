import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../../../app.config';
import {
  CreateProgramDto,
  CreateProgramResponse,
  GetAllProgramsResponse,
  ProgramQueryParams,
  UpdateProgramDto,
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

  createProgram(body: CreateProgramDto) {
    return this.http.post<CreateProgramResponse>(
      this.baseUrl + '/program',
      body,
      {
        withCredentials: true,
      }
    );
  }

  getAllPrograms(queryParams?: ProgramQueryParams) {
    return this.http.get<GetAllProgramsResponse>(this.baseUrl + '/program', {
      withCredentials: true,
      params: queryParams,
    });
  }

  editProgram(id: number, body: UpdateProgramDto) {
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
