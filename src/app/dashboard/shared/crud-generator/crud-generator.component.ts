import {
  Component,
  InjectionToken,
  input,
  inject,
  Input,
  ElementRef,
  ViewChild,
  Injector,
} from '@angular/core';
import { CRUDConfig, FieldType, Field } from './crud-generator.model';
import { BaseCRUDService } from '../BaseCRUDService/BaseCRUDService';
import { IGenericCrudService } from '../BaseCRUDService/BaseCRUD.model';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { MultiSelect, MultiSelectFilterEvent } from 'primeng/multiselect';
import { OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-crud-generator',
  imports: [ReactiveFormsModule, TableModule],
  templateUrl: './crud-generator.component.html',
  styleUrl: './crud-generator.component.css',
})
export class CrudGeneratorComponent implements OnInit {
  constructor(private injector: Injector) {}

  // Get dialog references from the template
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  @ViewChild('editDialog') private updateDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('editDialogForm')
  private updateDialogForm!: ElementRef<HTMLFormElement>;

  config = input.required<CRUDConfig>();
  pageName = input.required<string>();

  // Service and Subject used by the main table
  @Input({ required: true })
  mainServiceToken!: InjectionToken<IGenericCrudService>;

  // Map for storing the injected instance of the main service
  serviceMap = new Map<
    InjectionToken<IGenericCrudService>,
    IGenericCrudService
  >();

  // Map for storing the injected instance of inner services(services required for select options)
  innerServiceMap = new Map<
    InjectionToken<IGenericCrudService>,
    {
      service: IGenericCrudService;
      subject: Subject<string>;
      options: string[];
      onFilter: (event: MultiSelectFilterEvent) => void;
    }
  >();

  tableSubject = new Subject<TableLazyLoadEvent>();

  lastEvent: TableLazyLoadEvent | null = null;
  loading = true;

  // Input form control attached to the search input of the main table
  searchControl = new FormControl<string>('');

  // Stores the response values for the main table
  mainItems: unknown[] = [];
  // The total number of records in the database
  totalCount = 0;

  private fb = new FormBuilder();
  form = this.fb.group({});

  ngOnInit(): void {
    // initialize main service
    this.serviceMap.set(
      this.mainServiceToken,
      this.injector.get(this.mainServiceToken)
    );

    // initialize inner services
    this.initializeServiceInstances(this.config());

    // initialize reactive form
    this.initializeReactiveForm(this.config());

    // wire the main subject to input and the input to its sources
    this.wireMainSubjectToInput();
  }

  /**
   * Runs everytime the PrimeNG p-table emits TableLazyLoadEvent, p-table emits this event on first load and when page changes
   *
   * @param {TableLazyLoadEvent} event
   * @memberof CrudGeneratorComponent
   */
  loadItems(event: TableLazyLoadEvent) {
    this.lastEvent = event;
    this.tableSubject.next(event);
  }

  /**
   *Reloads the table and resets the page number to the first page
   *
   * @memberof CrudGeneratorComponent
   */
  tableReload() {
    if (this.lastEvent) {
      // set the table back to the first page on reload
      this.tableSubject.next({ ...this.lastEvent, first: 0 });
    }
  }

  private initializeServiceInstances(config: CRUDConfig) {
    for (const field of config.POST) {
      if (field.inputType == 'select' || field.inputType == 'multiselect') {
        const serviceObject = {
          service: this.injector.get(field.fetchServiceToken),
          subject: new Subject<string>(),
          options: [],
          onFilter(event: MultiSelectFilterEvent) {
            const query: string = event.filter;
            serviceObject.subject.next(query);
          },
        };

        // wire source to subject
        serviceObject.subject
          .pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((query) => {
              return serviceObject.service.get({ query });
            })
          )
          .subscribe((response) => {
            serviceObject.options = response.fetch;
          });

        this.innerServiceMap.set(field.fetchServiceToken, serviceObject);
      }
    }
  }

  private initializeReactiveForm(config: CRUDConfig) {
    for (const field of config.POST) {
      this.form.addControl(
        field.label,
        new FormControl(
          field.defaultValue,
          field.validators || [],
          field.asyncValidators || []
        )
      );
    }
  }

  private wireMainSubjectToInput() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.tableReload())
      )
      .subscribe();

    this.tableSubject
      .pipe(
        tap(() => (this.loading = true)),
        switchMap((event: TableLazyLoadEvent) => {
          const query = this.searchControl.value;
          const pageNumber = event.first! / event.rows! + 1;
          const pageSize = event.rows!;

          const queryParams = {
            query,
            pageNumber,
            pageSize,
          };

          return this.serviceMap.get(this.mainServiceToken)!.get(queryParams);
        }),
        tap(() => (this.loading = false))
      )
      .subscribe((response) => {
        this.mainItems = response.fetch;
        console.log('mainItems', this.mainItems);
        console.log('fetch', response.courses);
        this.totalCount = response.totalCount;
      });
  }

  getOptionsFor(field: Field) {
    if (field.inputType == 'select' || field.inputType == 'multiselect') {
      return this.innerServiceMap.get(field.fetchServiceToken)?.options ?? [];
    }
    return [];
  }

  // dialog methods

  openDialog() {
    this.dialog.nativeElement.show();
    this.form.reset();

    for (const item of this.innerServiceMap.entries()) {
      const [token, serviceObject] = item;
      serviceObject.subject.next('');
    }
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
}
