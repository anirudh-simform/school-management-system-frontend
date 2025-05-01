import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HttpService } from '../../../../http.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgramResponse } from './programs.model';
import { CourseResponse } from '../courses/courses.model';
import { ArrayElement } from '../../../../app.model';

@Component({
  selector: 'app-programs',
  imports: [ReactiveFormsModule],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css',
})
export class ProgramsComponent {
  // TODO: Update to latest information
  private http = inject(HttpService);
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('editDialogForm')
  private editDialogForm!: ElementRef<HTMLFormElement>;
  private programToEdit: number | undefined;
  programs: ProgramResponse['programs'] = [];
  expandedProgramId: number | undefined | null;
  allCourses: CourseResponse = [];

  toggleExpandedProgram(programId: number) {
    if (this.expandedProgramId == programId) {
      this.expandedProgramId = null;
    } else {
      this.expandedProgramId = programId;
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
    courses: this.formBuilder.group({}),
  });

  ngOnInit(): void {
    this.http.getAllPrograms().subscribe({
      next: (programs) => {
        this.programs = programs;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (
      this.form.value.name &&
      this.form.value.description &&
      this.form.value.courses
    ) {
      const requestBody = {
        name: this.form.value.name,
        description: this.form.value.description,
        courses: Object.entries(this.form.value.courses)
          .filter(([id, checked]) => checked)
          .map(([id]) => {
            return {
              id: Number(id),
            };
          }),
      };
      this.http.createProgram(requestBody).subscribe((data) => {
        this.programs = data.programs;
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
    this.http.getAllCourses().subscribe((data) => {
      this.allCourses = data;

      const courseControls = this.allCourses.reduce((acc, course) => {
        acc[course.id] = new FormControl(false);
        return acc;
      }, {} as Record<string, FormControl>);

      this.form.setControl('courses', this.formBuilder.group(courseControls));
    });
    this.dialogForm.nativeElement.reset();
    this.dialog.nativeElement.showModal();
  }

  openEditModal(
    id: number,
    name: string,
    description: string,
    courses: ArrayElement<ProgramResponse['programs']>['courses']
  ) {
    this.editDialog.nativeElement.showModal();
    this.form.controls.name.setValue(name);
    this.form.controls.description.setValue(description);
    this.http.getAllCourses().subscribe((data) => {
      this.allCourses = data;

      const selectedCourseIds = courses.map((course) => course.id);

      const courseControls = this.allCourses.reduce((acc, course) => {
        let checkedStatus = false;

        if (selectedCourseIds.includes(course.id)) {
          checkedStatus = true;
        }
        acc[course.id] = new FormControl(checkedStatus);
        return acc;
      }, {} as Record<string, FormControl>);

      console.log(courseControls);

      this.form.setControl('courses', this.formBuilder.group(courseControls));
    });
    this.programToEdit = id;
  }

  onEditProgram() {
    if (
      this.form.value.name &&
      this.form.value.description &&
      this.programToEdit &&
      this.form.value.courses
    ) {
      const requestBody = {
        name: this.form.value.name,
        description: this.form.value.description,
        courses: Object.entries(this.form.value.courses)
          .filter(([id, checked]) => checked)
          .map(([id]) => {
            return {
              id: Number(id),
            };
          }),
      };

      const c = Object.entries(this.form.value.courses)
        .filter(([id, checked]) => checked)
        .map(([id]) => {
          return {
            id: Number(id),
          };
        });

      console.log(c);

      console.log(this.programToEdit);

      this.http
        .editProgram(this.programToEdit, requestBody)
        .subscribe((data) => {
          console.log(data);
          this.programs = data.programs;
        });
    }
  }

  deleteProgram(id: number) {
    this.http.deleteProgram(id).subscribe((data) => {
      this.programs = data.programs;
      console.log(data);
    });
  }
}
