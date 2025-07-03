import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GetAllProgramsResponse } from './programs.model';
import { CourseResponse } from '../courses/courses.model';
import { ArrayElement } from '../../../../app.model';
import { ProgramService } from './service/program.service';
import { CourseService } from '../courses/service/course.service';
import { MultiSelectFilterEvent, MultiSelectModule } from 'primeng/multiselect';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { JsonPipe } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-programs',
  imports: [
    ReactiveFormsModule,
    MultiSelectModule,
    TableModule,
    ListboxModule,
    PopoverModule,
  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css',
})
export class ProgramsComponent {
  // TODO: Update to latest information
  // private programService = inject(ProgramService);
  // private courseService = inject(CourseService);
  // @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  // @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  // @ViewChild('editDialogForm')
  // private editDialogForm!: ElementRef<HTMLFormElement>;
  // private programToEdit: number | undefined;
  // programs: GetAllProgramsResponse['programs'] = [];
  // expandedProgramId: number | undefined | null;
  // allCourses: CourseResponse['courses'] = [];
  // loadingCourses = false;
  // private filterService = new Subject<string>();
  // private lazyLoadingSubject = new Subject<TableLazyLoadEvent>();
  // private lastEvent: TableLazyLoadEvent | null = null;
  // totalCount = 0;
  // searchControl = new FormControl<string>('');
  // loading = true;
  // constructor() {
  //   this.coursesGroup.valueChanges.subscribe((data) => {
  //     console.log(data);
  //   });
  //   this.searchControl.valueChanges.subscribe((val) => {
  //     console.log(val);
  //   });
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
  //   selectedCourses: [[] as number[]],
  // });
  // coursesGroup = this.formBuilder.group({});
  // ngOnInit(): void {
  //   // this.programService.getAllPrograms().subscribe({
  //   //   next: (programs) => {
  //   //     this.programs = programs;
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
  //         const pageNumber = event.first! / event.rows! + 1;
  //         const pageSize = event.rows!;
  //         const query = this.searchControl.value || '';
  //         const queryParams = {
  //           name: query,
  //           pageNumber: pageNumber,
  //           pageSize: pageSize,
  //         };
  //         return this.programService.getAllPrograms(queryParams);
  //       })
  //       // tap(() => (this.loading = false))
  //     )
  //     .subscribe((response) => {
  //       this.programs = response.programs;
  //       this.totalCount = response.totalCount;
  //       console.log(response);
  //       console.log(this.programs);
  //       this.loading = false;
  //     });
  //   this.filterService
  //     .pipe(
  //       debounceTime(300),
  //       distinctUntilChanged(),
  //       switchMap((query) => {
  //         this.loadingCourses = true;
  //         return this.courseService.getAllCourses({ name: query });
  //       })
  //     )
  //     .subscribe((response) => {
  //       this.loadingCourses = false;
  //       console.log(response.courses);
  //       this.allCourses = response.courses;
  //     });
  // }
  // onSubmit(event: Event) {
  //   if (this.form.invalid) {
  //     event.preventDefault();
  //     return;
  //   }
  //   if (this.form.value) {
  //     const requestBody = {
  //       name: this.form.controls.name.value!,
  //       description: this.form.controls.description.value!,
  //       courses: this.form.controls.selectedCourses.value!,
  //     };
  //     console.log(requestBody);
  //     this.programService
  //       .createProgram(requestBody)
  //       .pipe(tap(() => this.tableReload()))
  //       .subscribe((data) => {
  //         console.log(data);
  //       });
  //   }
  //   console.log(this.form.value);
  // }
  // onCourseFilter(event: MultiSelectFilterEvent) {
  //   const query: string = event.filter;
  //   console.log(event);
  //   this.filterService.next(query);
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
  //   // this.courseService.getAllCourses().subscribe((data) => {
  //   //   const courseControls = data['courses'].reduce((acc, course) => {
  //   //     acc[course.id] = new FormControl(false);
  //   //     return acc;
  //   //   }, {} as Record<string, FormControl>);
  //   //   this.coursesGroup = this.formBuilder.group(courseControls);
  //   //   this.allCourses = data['courses'];
  //   // });
  //   this.filterService.next('');
  //   this.dialogForm.nativeElement.reset();
  //   this.dialog.nativeElement.showModal();
  // }
  // openEditModal(
  //   id: number,
  //   name: string,
  //   description: string,
  //   courses: ArrayElement<GetAllProgramsResponse['programs']>['courses']
  // ) {
  //   this.editDialog.nativeElement.showModal();
  //   this.form.controls.name.setValue(name);
  //   this.form.controls.description.setValue(description);
  //   this.filterService.next('');
  //   this.form.controls.selectedCourses.setValue(
  //     courses.map((course) => course.id)
  //   );
  //   this.programToEdit = id;
  // }
  // onEditProgram(event: Event) {
  //   if (this.form.invalid) {
  //     event.preventDefault();
  //     return;
  //   }
  //   if (this.form.value) {
  //     const requestBody = {
  //       name: this.form.controls.name.value!,
  //       description: this.form.controls.description.value!,
  //       courses: this.form.controls.selectedCourses.value!,
  //     };
  //     console.log(requestBody);
  //     if (this.programToEdit) {
  //       this.programService
  //         .editProgram(this.programToEdit, requestBody)
  //         .pipe(tap(() => this.tableReload()))
  //         .subscribe((data) => {
  //           console.log(data);
  //         });
  //     } else {
  //       return;
  //     }
  //   }
  // }
  // deleteProgram(id: number) {
  //   this.programService
  //     .deleteProgram(id)
  //     .pipe(tap(() => this.tableReload()))
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
  // toggleExpandedProgram(programId: number) {
  //   if (this.expandedProgramId == programId) {
  //     this.expandedProgramId = null;
  //   } else {
  //     this.expandedProgramId = programId;
  //   }
  // }
  // onLazyLoad(event: TableLazyLoadEvent) {
  //   this.lastEvent = event;
  //   console.log('event = ', event);
  //   this.lazyLoadingSubject.next(event);
  // }
  // tableReload() {
  //   if (this.lastEvent) {
  //     this.loading = true;
  //     console.log(this.lastEvent);
  //     this.lazyLoadingSubject.next({ ...this.lastEvent, first: 0 });
  //   }
  // }
}
