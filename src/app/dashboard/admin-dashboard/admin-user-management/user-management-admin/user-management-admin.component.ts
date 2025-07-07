import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import validator from 'validator';
import { Gender, Role } from '../admin-user-management.model';
// import { AddAdminRequest } from '../user-management-student/user-management-student.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-management-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './user-management-admin.component.html',
  styleUrl: './user-management-admin.component.css',
})
export class UserManagementAdminComponent {
  // @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  // private http = inject(UserService);
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
  //   role: [
  //     'Admin',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  // });
  // openModal() {
  //   this.form.controls.role.setValue('Admin');
  //   this.dialog.nativeElement.showModal();
  // }
  // closeModal() {
  //   this.form.reset();
  //   this.dialog.nativeElement.close();
  // }
  // onSubmit(event: Event) {
  //   if (this.form.invalid) {
  //     event.preventDefault();
  //     return;
  //   }
  //   const requestBody: AddAdminRequest = {
  //     firstname: this.form.value.firstname!,
  //     lastname: this.form.value.lastname!,
  //     email: this.form.value.email!,
  //     dob: new Date(this.form.value.dob!),
  //     gender: this.form.value.gender! as unknown as Gender,
  //     phone: this.form.value.phone!,
  //     password: this.form.value.password!,
  //     role: this.form.value.role! as unknown as Role,
  //   };
  //   this.http.createAdmin(requestBody).subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
