import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DepartmentService } from './service/department.service';
import { DEPARTMENT_SERVICE_TOKEN } from '../../../../tokens';
import { CRUDConfig } from '../../../shared/crud-generator/crud-generator.model';
import { CrudGeneratorComponent } from '../../../shared/crud-generator/crud-generator.component';
@Component({
  selector: 'app-department',
  imports: [ReactiveFormsModule, CrudGeneratorComponent],
  providers: [
    {
      provide: DEPARTMENT_SERVICE_TOKEN,
      useExisting: DepartmentService,
    },
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent {
  // private http = inject(DepartmentService);
  // @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  // @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('editDialogForm')
  // private editDialogForm!: ElementRef<HTMLFormElement>;
  // private modalToEdit: number | undefined;
  // departments: { id: number; name: string }[] = [];

  // formBuilder = new FormBuilder();
  // form = this.formBuilder.group({
  //   name: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  // });

  // ngOnInit(): void {
  //   this.http.getAllDepartments().subscribe({
  //     next: (departments) => {
  //       this.departments = departments;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  // onSubmit(event: Event) {
  //   if (this.form.invalid) {
  //     event.preventDefault();
  //     return;
  //   }
  //   if (this.form.value.name) {
  //     this.http
  //       .createDepartment({ name: this.form.value.name })
  //       .subscribe((data) => {
  //         this.departments = data.departments;
  //         console.log(data);
  //       });
  //   }
  // }

  // closeModal(event: MouseEvent) {
  //   event.preventDefault();
  //   this.dialog.nativeElement.close();
  //   this.dialogForm.nativeElement.reset();
  // }

  // closeEditModal(event: MouseEvent) {
  //   event.preventDefault();
  //   this.editDialog.nativeElement.close();
  //   this.editDialogForm.nativeElement.reset();
  // }

  // openModal() {
  //   this.dialogForm.nativeElement.reset();
  //   this.dialog.nativeElement.showModal();
  // }

  // openEditModal(id: number, name: string) {
  //   this.editDialog.nativeElement.showModal();
  //   this.form.controls.name.setValue(name);
  //   this.modalToEdit = id;
  // }

  // onEditDepartment(event: Event) {
  //   if (this.form.invalid) {
  //     event.preventDefault();
  //     return;
  //   }
  //   if (this.form.value.name && this.modalToEdit) {
  //     this.http
  //       .editDepartment(this.modalToEdit, { name: this.form.value.name })
  //       .subscribe((data) => {
  //         this.departments = data.departments;
  //         console.log(data);
  //       });
  //   }
  // }

  // deleteDepartment(id: number) {
  //   this.http.deleteDepartment(id).subscribe((data) => {
  //     this.departments = data.departments;
  //     console.log(data);
  //   });
  // }

  departmentService = DEPARTMENT_SERVICE_TOKEN;

  config: CRUDConfig = {
    POST: [
      {
        name: 'name',
        label: 'Department Name',
        defaultValue: '',
        inputType: 'input',
        type: 'text',
      },
    ],
    PUT: [],
  };
}
