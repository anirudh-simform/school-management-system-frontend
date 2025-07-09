import { Component } from '@angular/core';
import { DEPARTMENT_SERVICE_TOKEN } from '../../../../tokens';
import { INSTRUCTOR_SERVICE_TOKEN } from '../../../../tokens';
import { DepartmentService } from '../../admin-configure/department/service/department.service';
import { InstructorService } from './services/instructor.service';
import { CRUDConfig } from '../../../shared/crud-generator/crud-generator.model';
import { Validators } from '@angular/forms';
import { CrudGeneratorComponent } from '../../../shared/crud-generator/crud-generator.component';
@Component({
  selector: 'app-user-management-instructor',
  imports: [CrudGeneratorComponent],
  providers: [
    {
      provide: DEPARTMENT_SERVICE_TOKEN,
      useExisting: DepartmentService,
    },
    {
      provide: INSTRUCTOR_SERVICE_TOKEN,
      useExisting: InstructorService,
    },
  ],
  templateUrl: './user-management-instructor.component.html',
  styleUrl: './user-management-instructor.component.css',
})
export class UserManagementInstructorComponent {
  instructorService = INSTRUCTOR_SERVICE_TOKEN;

  config: CRUDConfig = {
    POST: [
      {
        name: 'firstname',
        label: 'First Name',
        defaultValue: '',
        inputType: 'input',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'lastname',
        label: 'Last Name',
        defaultValue: '',
        inputType: 'input',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'email',
        label: 'Email',
        defaultValue: '',
        inputType: 'input',
        type: 'email',
        validators: [Validators.required, Validators.email],
      },

      {
        name: 'dob',
        label: 'Date of Birth',
        defaultValue: '',
        inputType: 'input',
        type: 'date',
        validators: [Validators.required],
      },
      {
        name: 'phone',
        label: 'Phone',
        defaultValue: '',
        inputType: 'input',
        type: 'text',
        validators: [Validators.required],
      },
      {
        name: 'gender',
        label: 'Gender',
        defaultValue: '',
        inputType: 'input',
        type: 'radio',
        validators: [Validators.required],
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ],
      },
      {
        name: 'department',
        label: 'Department',
        defaultValue: 0,
        inputType: 'autocomplete',
        fetchServiceToken: DEPARTMENT_SERVICE_TOKEN,
        optionLabel: 'name',
        optionValue: 'id',
      },
    ],
    PUT: [],
  };
}
