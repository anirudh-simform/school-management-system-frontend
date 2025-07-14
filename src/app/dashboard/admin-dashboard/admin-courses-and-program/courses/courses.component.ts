import {
  Component,
  DoCheck,
  ElementRef,
  inject,
  InjectionToken,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseService } from './service/course.service';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { CrudGeneratorComponent } from '../../../shared/crud-generator/crud-generator.component';
import { CRUDConfig } from '../../../shared/crud-generator/crud-generator.model';
import { COURSE_SERVICE_TOKEN } from '../../../../tokens';

@Component({
  selector: 'app-courses',
  imports: [ReactiveFormsModule, TableModule, CrudGeneratorComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  providers: [
    {
      provide: COURSE_SERVICE_TOKEN,
      useExisting: CourseService,
    },
  ],
})
export class CoursesComponent {
  // private http = inject(CourseService);
  // @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  // @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('editDialogForm')
  // private editDialogForm!: ElementRef<HTMLFormElement>;
  // private courseToEdit: number | undefined;
  // courses: { id: number; name: string; description: string }[] = [];
  // expandedCourseId: number | undefined | null;
  // searchControl = new FormControl('');
  // private lazyLoadingSubject = new Subject<TableLazyLoadEvent>();
  // private lastEvent: TableLazyLoadEvent | null = null;
  // loading = true;
  // totalRecords = 0;
  // toggleExpandedCourse(courseId: number) {
  //   if (this.expandedCourseId == courseId) {
  //     this.expandedCourseId = null;
  //   } else {
  //     this.expandedCourseId = courseId;
  //   }
  // }
  // formBuilder = new FormBuilder();
  // form = this.formBuilder.group({
  //   name: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  //   description: [
  //     '',
  //     {
  //       validators: [Validators.required],
  //     },
  //   ],
  // });
  // ngOnInit(): void {
  //   // this.http.getAllCourses().subscribe({
  //   //   next: (courses) => {
  //   //     this.courses = courses;
  //   //   },
  //   //   error: (error) => {
  //   //     console.log(error);
  //   //   },
  //   // });
  //   this.searchControl.valueChanges
  //     .pipe(
  //       debounceTime(300),
  //       distinctUntilChanged(),
  //       tap(() => this.tableReload())
  //     )
  //     .subscribe();
  //   this.lazyLoadingSubject
  //     .pipe(
  //       tap(() => (this.loading = true)),
  //       switchMap((event: TableLazyLoadEvent) => {
  //         const query = this.searchControl.value || '';
  //         const pageNumber = event.first! / event.rows! + 1;
  //         const size = event.rows!;
  //         const queryParams = {
  //           name: query,
  //           pageNumber: pageNumber,
  //           pageSize: size,
  //         };
  //         return this.http.getAllCourses(queryParams);
  //       }),
  //       tap(() => (this.loading = false))
  //     )
  //     .subscribe((response) => {
  //       this.courses = response.courses;
  //       this.totalRecords = response.totalCount;
  //     });
  // }
  // loadCourses(event: TableLazyLoadEvent) {
  //   this.lastEvent = event;
  //   this.lazyLoadingSubject.next(event);
  // }
  // tableReload() {
  //   if (this.lastEvent) {
  //     this.lazyLoadingSubject.next({ ...this.lastEvent, first: 0 });
  //   }
  // }
  // onSubmit(event: Event) {
  //   if (this.form.invalid) {
  //     event.preventDefault();
  //     return;
  //   }
  //   if (this.form.value.name && this.form.value.description) {
  //     this.http
  //       .createCourse({
  //         name: this.form.value.name,
  //         description: this.form.value.description,
  //       })
  //       .pipe(tap(() => this.tableReload()))
  //       .subscribe((data) => {
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
  // openEditModal(id: number, name: string, description: string) {
  //   this.editDialog.nativeElement.showModal();
  //   this.form.controls.name.setValue(name);
  //   this.form.controls.description.setValue(description);
  //   this.courseToEdit = id;
  // }
  // onEditCourse(event: Event) {
  //   if (this.form.invalid) {
  //     event.preventDefault();
  //     return;
  //   }
  //   if (
  //     this.form.value.name &&
  //     this.form.value.description &&
  //     this.courseToEdit
  //   ) {
  //     this.http
  //       .editCourse(this.courseToEdit, {
  //         name: this.form.value.name,
  //         description: this.form.value.description,
  //       })
  //       .pipe(
  //         tap(() => {
  //           this.tableReload();
  //         })
  //       )
  //       .subscribe((data) => {
  //         console.log(data);
  //       });
  //   }
  // }
  // deleteCourse(id: number) {
  //   this.http
  //     .deleteCourse(id)
  //     .pipe(tap(() => this.tableReload()))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  courseServiceToken = COURSE_SERVICE_TOKEN;
  config: CRUDConfig = {
    POST: [
      {
        name: 'name',
        label: 'Course Name',
        inputType: 'input',
        type: 'text',
        defaultValue: '',
      },
      {
        name: 'description',
        label: 'Description',
        inputType: 'input',
        type: 'text',
        defaultValue: '',
      },
    ],
    PUT: [
      {
        name: 'name',
        label: 'Course Name',
        inputType: 'input',
        type: 'text',
        defaultValue: '',
      },
      {
        name: 'descirption',
        label: 'Description',
        inputType: 'input',
        type: 'text',
        defaultValue: '',
      },
    ],
  };
}
