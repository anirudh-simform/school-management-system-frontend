import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../../../shared/BaseCRUDService/BaseCRUDService';
import {
  AdminQueryParms,
  CreateAdminDto,
  Admin,
} from '../user-management-admin.model';
@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseCRUDService<
  AdminQueryParms,
  Admin,
  CreateAdminDto
> {
  constructor() {
    super();
    this.endPoint = 'admin';
  }
}
