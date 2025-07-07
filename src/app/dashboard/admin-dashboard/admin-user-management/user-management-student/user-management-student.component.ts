import { Component, ElementRef, inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import validator from 'validator';
import { Gender, Role } from '../admin-user-management.model';
import { UserService } from '../service/user.service';
import { StudentBatchService } from '../../admin-configure/student-batch/service/student-batch.service';
import {
  STUDENT_SERVICE_TOKEN,
  GRADE_LEVEL_SERVICE_TOKEN,
  STUDENT_BATCH_SERVICE_TOKEN,
} from '../../../../tokens';
import { StudentService } from './services/student.service';
import { GradeLevelService } from '../../admin-configure/grade-level/services/grade-level.service';
import { CRUDConfig } from '../../../shared/crud-generator/crud-generator.model';
import { CrudGeneratorComponent } from '../../../shared/crud-generator/crud-generator.component';

@Component({
  selector: 'app-user-management-student',
  imports: [ReactiveFormsModule, CrudGeneratorComponent],
  providers: [
    {
      provide: STUDENT_SERVICE_TOKEN,
      useExisting: StudentService,
    },
    {
      provide: GRADE_LEVEL_SERVICE_TOKEN,
      useExisting: GradeLevelService,
    },
    {
      provide: STUDENT_BATCH_SERVICE_TOKEN,
      useExisting: StudentBatchService,
    },
  ],
  templateUrl: './user-management-student.component.html',
  styleUrl: './user-management-student.component.css',
})
export class UserManagementStudentComponent {
  // @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  // studentBatches: GetAllStudentBatchesResponse = [];
  // private userService = inject(UserService);
  // private studentBatchService = inject(StudentBatchService);
  // formBuilder = new FormBuilder();
  // form = this.formBuilder.group({
  //   firstname: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  //   lastname: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  //   email: [
  //     '',
  //     {
  //       validators: [Validators.required, Validators.email],
  //     },
  //   ],
  //   dob: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  //   password: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  //   phone: [
  //     '',
  //     {
  //       validators: [
  //         Validators.required,
  //         function validatorFn(control: AbstractControl) {
  //           const value = control.value;
  //           if (value) {
  //             if (validator.isMobilePhone(value, ['en-IN'])) {
  //               return null;
  //             } else {
  //               return { invalidPhone: true };
  //             }
  //           }
  //           return { invalidPhone: true };
  //         },
  //       ],
  //     },
  //   ],
  //   gender: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  //   role: ['Student'],
  //   studentBatch: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  // });
  // openModal() {
  //   this.studentBatchService.getAllStudentBatches().subscribe((data) => {
  //     this.studentBatches = data;
  //     this.form.reset();
  //     this.dialog.nativeElement.showModal();
  //     this.dialogForm.nativeElement.reset();
  //   });
  // }
  // closeModal() {
  //   this.form.reset();
  //   this.dialogForm.nativeElement.reset();
  //   this.dialog.nativeElement.close();
  // }
  // onSubmit(event: Event) {
  //   if (this.form.invalid) {
  //     event.preventDefault();
  //     return;
  //   }
  //   const requestBody = {
  //     firstname: this.form.value.firstname!,
  //     lastname: this.form.value.lastname!,
  //     email: this.form.value.email!,
  //     dob: new Date(this.form.value.dob!),
  //     gender: this.form.value.gender! as unknown as Gender,
  //     phone: this.form.value.phone!,
  //     password: this.form.value.password!,
  //     role: this.form.value.role! as unknown as Role,
  //     studentProfile: {
  //       studentBatchId: Number(this.form.value.studentBatch!),
  //     },
  //   };
  //   this.userService.createStudent(requestBody).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  studentService = STUDENT_SERVICE_TOKEN;

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
        name: 'password',
        label: 'Password',
        defaultValue: '',
        inputType: 'input',
        type: 'password',
        validators: [Validators.required],
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
        name: 'studentBatch',
        label: 'Student Batch',
        defaultValue: 0,
        inputType: 'autocomplete',
        fetchServiceToken: STUDENT_BATCH_SERVICE_TOKEN,
        optionLabel: 'name',
        optionValue: 'id',
      },
      {
        name: 'gradeLevel',
        label: 'gradeLevel',
        defaultValue: 0,
        inputType: 'autocomplete',
        fetchServiceToken: GRADE_LEVEL_SERVICE_TOKEN,
        optionLabel: 'name',
        optionValue: 'id',
      },
    ],
    PUT: [
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
        name: 'studentBatch',
        label: 'Student Batch',
        defaultValue: 0,
        inputType: 'autocomplete',
        fetchServiceToken: STUDENT_BATCH_SERVICE_TOKEN,
        optionLabel: 'name',
        optionValue: 'id',
      },
      {
        name: 'gradeLevel',
        label: 'gradeLevel',
        defaultValue: 0,
        inputType: 'autocomplete',
        fetchServiceToken: GRADE_LEVEL_SERVICE_TOKEN,
        optionLabel: 'name',
        optionValue: 'id',
      },
    ],
  };
}
