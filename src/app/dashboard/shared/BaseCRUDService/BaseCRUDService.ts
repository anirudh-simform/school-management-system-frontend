import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BASE_URL } from '../../../app.config';
import {
  GetResponse,
  IGenericCrudService,
  QueryParams,
} from './BaseCRUD.model';
import { Observable } from 'rxjs';

export class BaseCRUDService<
  TQueryParams extends QueryParams,
  TCreateResponse,
  TUpdateResponse,
  TDeleteResponse,
  TListItem,
  TCreateDto,
  TGetResponse = GetResponse<TListItem>,
  TUpdateDto = Partial<TCreateDto>
> implements IGenericCrudService
{
  private baseUrl = inject(BASE_URL);
  private http = inject(HttpClient);
  endPoint = '';
  constructor() {}

  get(queryParams?: TQueryParams): Observable<TGetResponse> {
    const url = `${this.baseUrl}/${this.endPoint}`;
    return this.http.get<TGetResponse>(url, {
      withCredentials: true,
      params: queryParams,
    });
  }

  create(body: TCreateDto): Observable<TCreateResponse> {
    const url = `${this.baseUrl}/${this.endPoint}`;
    return this.http.post<TCreateResponse>(url, body, {
      withCredentials: true,
    });
  }

  update(id: number, body: TUpdateDto): Observable<TUpdateResponse> {
    const url = `${this.baseUrl}/${this.endPoint}/${id}`;
    return this.http.put<TUpdateResponse>(url, body, { withCredentials: true });
  }

  delete(id: number): Observable<TDeleteResponse> {
    const url = `${this.baseUrl}/${this.endPoint}/${id}`;
    return this.http.delete<TDeleteResponse>(url, { withCredentials: true });
  }
}
