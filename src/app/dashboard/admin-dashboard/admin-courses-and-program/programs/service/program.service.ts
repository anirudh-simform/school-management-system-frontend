import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../../../shared/BaseCRUDService/BaseCRUDService';
import {
  CreateProgramDto,
  Program,
  ProgramQueryParams,
} from '../programs.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramService extends BaseCRUDService<
  ProgramQueryParams,
  Program,
  CreateProgramDto
> {
  // private baseUrl = inject(BASE_URL);

  // private http = inject(HttpClient);
  // constructor() {}

  // createProgram(body: CreateProgramDto) {
  //   return this.http.post<CreateProgramResponse>(
  //     this.baseUrl + '/program',
  //     body,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }

  // getAllPrograms(queryParams?: ProgramQueryParams) {
  //   return this.http.get<GetAllProgramsResponse>(this.baseUrl + '/program', {
  //     withCredentials: true,
  //     params: queryParams,
  //   });
  // }

  // editProgram(id: number, body: UpdateProgramDto) {
  //   return this.http.put<UpdateProgramResponse>(
  //     this.baseUrl + `/program/${id}`,
  //     body,
  //     { withCredentials: true }
  //   );
  // }

  // deleteProgram(id: number) {
  //   return this.http.delete<deletedProgramResponse>(
  //     this.baseUrl + `/program/${id}`,
  //     { withCredentials: true }
  //   );
  // }

  constructor() {
    super();
    this.endPoint = 'program';
  }
}
