import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  private http = inject(HttpService);
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('editDialogForm')
  private editDialogForm!: ElementRef<HTMLFormElement>;
  private modalToEdit: number | undefined;
  departments: { id: number; name: string }[] = [];

  formBuilder = new FormBuilder();
  form = this.formBuilder.group({
    name: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });

  ngOnInit(): void {
    this.http.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit(event: Event) {
    if (this.form.invalid) {
      event.preventDefault();
      return;
    }
    if (this.form.value.name) {
      this.http
        .createDepartment({ name: this.form.value.name })
        .subscribe((data) => {
          this.departments = data.departments;
          console.log(data);
        });
    }
  }

  closeModal(event: MouseEvent) {
    event.preventDefault();
    this.dialog.nativeElement.close();
    this.dialogForm.nativeElement.reset();
  }

  closeEditModal(event: MouseEvent) {
    event.preventDefault();
    this.editDialog.nativeElement.close();
    this.editDialogForm.nativeElement.reset();
  }

  openModal() {
    this.dialogForm.nativeElement.reset();
    this.dialog.nativeElement.showModal();
  }

  openEditModal(id: number, name: string) {
    this.editDialog.nativeElement.showModal();
    this.form.controls.name.setValue(name);
    this.modalToEdit = id;
  }

  onEditDepartment(event: Event) {
    if (this.form.invalid) {
      event.preventDefault();
      return;
    }
    if (this.form.value.name && this.modalToEdit) {
      this.http
        .editDepartment(this.modalToEdit, { name: this.form.value.name })
        .subscribe((data) => {
          this.departments = data.departments;
          console.log(data);
        });
    }
  }

  deleteDepartment(id: number) {
    this.http.deleteDepartment(id).subscribe((data) => {
      this.departments = data.departments;
      console.log(data);
    });
  }
}
