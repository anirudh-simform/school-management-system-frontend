import { Component, ElementRef, inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { GetAllStudentBatchesResponse } from '../../admin-configure/student-batch/student-batch.model';
import { HttpService } from '../../../../http.service';
import { ReactiveFormsModule } from '@angular/forms';
import validator from 'validator';
import { Gender, Role } from '../admin-user-management.model';
@Component({
  selector: 'app-user-management-student',
  imports: [ReactiveFormsModule],
  templateUrl: './user-management-student.component.html',
  styleUrl: './user-management-student.component.css',
})
export class UserManagementStudentComponent {
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  studentBatches: GetAllStudentBatchesResponse = [];

  private http = inject(HttpService);

  formBuilder = new FormBuilder();

  form = this.formBuilder.group({
    firstname: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    lastname: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],

    dob: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required],
      },
    ],

    phone: [
      '',
      {
        validators: [
          Validators.required,
          function validatorFn(control: AbstractControl) {
            const value = control.value;

            if (value) {
              if (validator.isMobilePhone(value, ['en-IN'])) {
                return null;
              } else {
                return { invalidPhone: true };
              }
            }

            return { invalidPhone: true };
          },
        ],
      },
    ],

    gender: [
      '',
      {
        validators: [Validators.required],
      },
    ],

    role: ['Student'],

    studentBatch: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });

  openModal() {
    this.http.getAllStudentBatches().subscribe((data) => {
      this.studentBatches = data;
      this.form.reset();

      this.dialog.nativeElement.showModal();
      this.dialogForm.nativeElement.reset();
    });
  }

  closeModal() {
    this.form.reset();
    this.dialogForm.nativeElement.reset();
    this.dialog.nativeElement.close();
  }

  onSubmit(event: Event) {
    if (this.form.invalid) {
      event.preventDefault();
      return;
    }

    const requestBody = {
      firstname: this.form.value.firstname!,
      lastname: this.form.value.lastname!,
      email: this.form.value.email!,
      dob: new Date(this.form.value.dob!),
      gender: this.form.value.gender! as unknown as Gender,
      phone: this.form.value.phone!,
      password: this.form.value.password!,
      role: this.form.value.role! as unknown as Role,
      studentProfile: {
        studentBatchId: Number(this.form.value.studentBatch!),
      },
    };
    this.http.createStudent(requestBody).subscribe((data) => {
      console.log(data);
    });
  }
}
