import {
  Component,
  DoCheck,
  ElementRef,
  inject,
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

@Component({
  selector: 'app-courses',
  imports: [ReactiveFormsModule, TableModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  private http = inject(CourseService);

  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('editDialogForm')
  private editDialogForm!: ElementRef<HTMLFormElement>;

  private courseToEdit: number | undefined;
  courses: { id: number; name: string; description: string }[] = [];
  expandedCourseId: number | undefined | null;

  searchControl = new FormControl('');
  private lazyLoadingSubject = new Subject<TableLazyLoadEvent>();
  private lastEvent: TableLazyLoadEvent | null = null;
  loading = true;
  totalRecords = 0;

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
    // this.http.getAllCourses().subscribe({
    //   next: (courses) => {
    //     this.courses = courses;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.tableReload())
      )
      .subscribe();

    this.lazyLoadingSubject
      .pipe(
        tap(() => (this.loading = true)),
        switchMap((event: TableLazyLoadEvent) => {
          const query = this.searchControl.value || '';
          const pageNumber = event.first! / event.rows!;
          const size = event.rows!;

          const queryParams = {
            name: query,
            pageNumber: pageNumber,
            pageSize: size,
          };

          return this.http.getAllCourses(queryParams);
        }),
        tap(() => (this.loading = false))
      )
      .subscribe((response) => {
        this.courses = response.courses;
        this.totalRecords = response.totalCount;
      });
  }

  loadCourses(event: TableLazyLoadEvent) {
    this.lastEvent = event;
    this.lazyLoadingSubject.next(event);
  }

  tableReload() {
    if (this.lastEvent) {
      this.lazyLoadingSubject.next({ ...this.lastEvent, first: 0 });
    }
  }

  onSubmit(event: Event) {
    if (this.form.invalid) {
      event.preventDefault();
      return;
    }
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

  onEditCourse(event: Event) {
    if (this.form.invalid) {
      event.preventDefault();
      return;
    }
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
