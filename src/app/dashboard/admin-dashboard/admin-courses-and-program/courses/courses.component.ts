import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HttpService } from '../../../../http.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  private http = inject(HttpService);
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('editDialogForm')
  private editDialogForm!: ElementRef<HTMLFormElement>;
  private courseToEdit: number | undefined;
  courses: { id: number; name: string; description: string }[] = [];
  expandedCourseId: number | undefined | null;

  toggleExpandedCourse(courseId: number) {
    if (this.expandedCourseId == courseId) {
      this.expandedCourseId = null;
    } else {
      this.expandedCourseId = courseId;
    }
  }

  formBuilder = new FormBuilder();
  form = this.formBuilder.group({
    name: [
      '',
      {
        validators: [Validators.required],
      },
    ],

    description: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });

  ngOnInit(): void {
    this.http.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.form.value.name && this.form.value.description) {
      this.http
        .createCourse({
          name: this.form.value.name,
          description: this.form.value.description,
        })
        .subscribe((data) => {
          this.courses = data.courses;
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

  openEditModal(id: number, name: string, description: string) {
    this.editDialog.nativeElement.showModal();
    this.form.controls.name.setValue(name);
    this.form.controls.description.setValue(description);
    this.courseToEdit = id;
  }

  onEditCourse() {
    if (
      this.form.value.name &&
      this.form.value.description &&
      this.courseToEdit
    ) {
      this.http
        .editCourse(this.courseToEdit, {
          name: this.form.value.name,
          description: this.form.value.description,
        })
        .subscribe((data) => {
          this.courses = data.courses;
          console.log(data);
        });
    }
  }

  deleteCourse(id: number) {
    this.http.deleteCourse(id).subscribe((data) => {
      this.courses = data.courses;
      console.log(data);
    });
  }
}
