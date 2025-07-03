import { Observable } from 'rxjs';

export type QueryParams = {
  pageNumber?: number;
  pageSize?: number;
};

export type GetResponse<T> = {
  fetch: T[];
  totalCount: number;
};

export interface IGenericCrudService {
  get(queryParams?: any): Observable<any>;
  create(data: any): Observable<any>;
  update(id: number | string, data: any): Observable<any>;
  delete(id: number | string): Observable<any>;
}
