import { Component, ElementRef, inject, ViewChild } from '@angular/core';

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
import { ProgramService } from './service/program.service';
import { CourseService } from '../courses/service/course.service';

@Component({
  selector: 'app-programs',
  imports: [ReactiveFormsModule],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css',
})
export class ProgramsComponent {
  // TODO: Update to latest information
  private programService = inject(ProgramService);
  private courseService = inject(CourseService);

  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('editDialogForm')
  private editDialogForm!: ElementRef<HTMLFormElement>;
  private programToEdit: number | undefined;
  programs: ProgramResponse['programs'] = [];
  expandedProgramId: number | undefined | null;
  allCourses: CourseResponse = [];

  constructor() {
    this.coursesGroup.valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

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
  });

  coursesGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.programService.getAllPrograms().subscribe({
      next: (programs) => {
        this.programs = programs;
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
    if (
      this.form.value.name &&
      this.form.value.description &&
      this.coursesGroup
    ) {
      const requestBody = {
        name: this.form.value.name,
        description: this.form.value.description,
        courses: Object.entries(this.coursesGroup.value)
          .filter(([id, checked]) => checked)
          .map(([id]) => {
            return {
              id: Number(id),
            };
          }),
      };
      this.programService.createProgram(requestBody).subscribe((data) => {
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
    this.courseService.getAllCourses().subscribe((data) => {
      const courseControls = data.reduce((acc, course) => {
        acc[course.id] = new FormControl(false);
        return acc;
      }, {} as Record<string, FormControl>);

      this.coursesGroup = this.formBuilder.group(courseControls);
      this.allCourses = data;
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
    this.courseService.getAllCourses().subscribe((data) => {
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

      this.coursesGroup = this.formBuilder.group(courseControls);
    });
    this.programToEdit = id;
  }

  onEditProgram(event: Event) {
    if (this.form.invalid) {
      event.preventDefault();
      return;
    }

    if (
      this.form.value.name &&
      this.form.value.description &&
      this.programToEdit &&
      this.coursesGroup
    ) {
      const requestBody = {
        name: this.form.value.name,
        description: this.form.value.description,
        courses: Object.entries(this.coursesGroup.value)
          .filter(([id, checked]) => checked)
          .map(([id]) => {
            return {
              id: Number(id),
            };
          }),
      };

      console.log(this.programToEdit);

      this.programService
        .editProgram(this.programToEdit, requestBody)
        .subscribe((data) => {
          console.log(data);
          this.programs = data.programs;
        });
    }
  }

  deleteProgram(id: number) {
    this.programService.deleteProgram(id).subscribe((data) => {
      this.programs = data.programs;
      console.log(data);
    });
  }
}
