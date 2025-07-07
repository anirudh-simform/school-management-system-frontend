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
import {
  CRUDConfig,
  FieldType,
  Field,
  InnerServiceMapObject,
} from './crud-generator.model';
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
import {
  AutoCompleteModule,
  AutoCompleteCompleteEvent,
  AutoCompleteDropdownClickEvent,
} from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { PopoverModule } from 'primeng/popover';
import { OrderListModule } from 'primeng/orderlist';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-crud-generator',
  imports: [
    ReactiveFormsModule,
    TableModule,
    MultiSelect,
    AutoCompleteModule,
    SelectModule,
    CheckboxModule,
    PopoverModule,
    OrderListModule,
    DatePipe,
    RadioButtonModule,
  ],
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
    InnerServiceMapObject
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

  // Tells the system when to open dialog in update mode
  updateMode = false;

  // Tracks the item to update using its id
  itemToUpdateId: number | string | undefined;

  private fb = new FormBuilder();
  form = this.fb.group({});

  ngOnInit(): void {
    this.form.valueChanges.subscribe((data) => console.log(data));
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
      if (
        field.inputType == 'autocomplete' ||
        field.inputType == 'multiselect'
      ) {
        const service = this.injector.get(field.fetchServiceToken);
        const subject = new Subject<string>();
        const baseObject = {
          service,
          subject,
          options: [],
        };
        let serviceObject: InnerServiceMapObject;
        if (field.inputType == 'multiselect') {
          serviceObject = {
            ...baseObject,
            inputType: 'multiselect',
            onFilter(event: MultiSelectFilterEvent) {
              const query: string = event.filter;
              serviceObject.subject.next(query);
            },
          };
        } else {
          serviceObject = {
            ...baseObject,
            inputType: 'autocomplete',
            onFilter(event: AutoCompleteCompleteEvent) {
              const query = event.query || '';
              serviceObject.subject.next(query);
            },
          };
        }

        // wire source to subject
        serviceObject.subject
          .pipe(
            debounceTime(300),
            switchMap((query) => {
              return serviceObject.service.get({ query });
            })
          )
          .subscribe((response) => {
            serviceObject.options = response.fetch;
            console.log(serviceObject.inputType, serviceObject.options);
            console.log('response fetch', response.fetch);
          });

        this.innerServiceMap.set(field.fetchServiceToken, serviceObject);
      }
    }
  }

  private initializeReactiveForm(config: CRUDConfig) {
    for (const field of config.POST) {
      this.form.addControl(
        field.name,
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

  /**
   * Returns the array supposed to store the options for a select or multi-select element
   *
   * @param {Field} field
   * @return {*}
   * @memberof CrudGeneratorComponent
   */
  getOptionsFor(field: Field) {
    if (field.inputType == 'autocomplete' || field.inputType == 'multiselect') {
      return this.innerServiceMap.get(field.fetchServiceToken)?.options ?? [];
    }
    return [];
  }

  /**
   *Returns the function that should run when a multiselect emits a filter event
   *
   * @param {Field} field
   * @return {*}
   * @memberof CrudGeneratorComponent
   */
  getMultiselectEventFunctionFor(field: Field) {
    if (field.inputType == 'multiselect') {
      const obj = this.innerServiceMap.get(field.fetchServiceToken);
      if (obj?.inputType == 'multiselect') {
        return obj.onFilter;
      } else {
        return function fallback(event: MultiSelectFilterEvent) {
          console.error('No event function defined for field: ', field.name);
        };
      }
    }
    return function fallback(event: MultiSelectFilterEvent) {
      console.error('Field not of type select or multiselect: ', field.name);
    };
  }

  /**
   *Returns the function that should run when an autocomplete  emits a filter event
   *
   * @param {Field} field
   * @return {*}
   * @memberof CrudGeneratorComponent
   */
  getAutocompleteEventFunctionFor(field: Field) {
    if (field.inputType == 'autocomplete') {
      const obj = this.innerServiceMap.get(field.fetchServiceToken);
      if (obj?.inputType == 'autocomplete') {
        return obj.onFilter;
      } else {
        return function fallback(event: AutoCompleteCompleteEvent) {
          console.error('No event function defined for field: ', field.name);
        };
      }
    }

    return function fallback(event: AutoCompleteCompleteEvent) {
      console.error('Field not of type select or multiselect: ', field.name);
    };
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
    this.updateMode = false;
  }

  onPOST(event: Event) {
    if (this.form.invalid) {
      event.preventDefault();
      return;
    }

    const formValue = this.getFormData(this.form.value);

    console.log(formValue);

    this.serviceMap
      .get(this.mainServiceToken)!
      .create(formValue)
      .pipe(tap(() => this.tableReload()))
      .subscribe((response) => {
        this.mainItems = response.fetch;
        console.log(response);
        console.log('mainItems', this.mainItems);
      });
  }

  openUpdateDialog(id: number | string, formData: any) {
    this.dialog.nativeElement.showModal();
    console.log('id', id);
    console.log('formData', formData);
    console.log('formValue', this.form.value);
    this.itemToUpdateId = id;
    this.updateMode = true;

    for (const value of this.innerServiceMap.values()) {
      value.subject.next('');
    }

    let processedData = this.convertDatesForForm(formData);
    processedData = this.getFormDataForDisplay(processedData);

    console.log('formValue from PUT', processedData);
    this.form.patchValue(processedData);
    console.log('processedData', processedData);
    console.log('formData', formData);
  }

  onPUT(event: Event) {
    console.log('inside put');
    console.log(this.updateMode);
    if (this.form.invalid) {
      event.preventDefault();
      return;
    }

    if (!this.itemToUpdateId) {
      alert('No item selected for update');
      return;
    }

    let formValue = this.getFormData(this.form.value);
    this.serviceMap
      .get(this.mainServiceToken)!
      .update(this.itemToUpdateId, formValue)
      .pipe(tap(() => this.tableReload()))
      .subscribe((data) => {
        console.log(data);
      });
  }

  onDELETE(id: number | string) {
    console.log('id delete', id);

    this.serviceMap
      .get(this.mainServiceToken)!
      .delete(id)
      .pipe(tap(() => this.tableReload()))
      .subscribe((data) => {
        console.log(data);
      });
  }

  // utility methods

  isRadioField(field: Field): field is Extract<Field, { type: 'radio' }> {
    return field.inputType == 'input' && field.type == 'radio';
  }

  getFormData(formData: Record<string, unknown>) {
    const dataCopy = structuredClone(formData);
    let ids = [];
    // for (const key in dataCopy) {
    //   if (Array.isArray(dataCopy[key])) {
    //     const idArray = dataCopy[key];
    //     ids.push(
    //       idArray.map((obj) => {
    //         return obj.id;
    //       })
    //     );
    //     dataCopy[key] = ids;
    //   }
    //   ids = [];
    // }

    // return dataCopy;

    for (const inputConfig of this.config()['POST']) {
      if (inputConfig.inputType == 'multiselect') {
        const objValue = dataCopy[inputConfig.name];
        const idKey = inputConfig.optionValue;

        if (Array.isArray(objValue)) {
          const processedArray = objValue.map((item) =>
            typeof item == 'object' ? item[idKey] : item
          );
          dataCopy[inputConfig.name] = processedArray;
        }
      } else if (inputConfig.inputType == 'autocomplete') {
        const id = `${inputConfig.optionValue.toString()}`;
        const obj = dataCopy[inputConfig.name] as Record<string, any>;
        const processedObj = obj[id];
        dataCopy[inputConfig.name] = processedObj;
      }
    }

    return dataCopy;
  }

  getFormDataForDisplay(formData: Record<string, unknown>) {
    const dataCopy = { ...formData };

    for (const inputConfig of this.config()['POST']) {
      if (inputConfig.inputType == 'multiselect') {
        const objValue = dataCopy[inputConfig.name];
        const idKey = inputConfig.optionValue;

        if (Array.isArray(objValue)) {
          const processedArray = objValue.map((item) =>
            typeof item == 'object' ? item[idKey] : item
          );
          dataCopy[inputConfig.name] = processedArray;
        }
      }
    }

    return dataCopy;
  }

  convertDatesForForm(formData: Record<string, unknown>) {
    const dataCopy = { ...formData };
    for (const inputConfig of this.config()['POST']) {
      if (
        inputConfig['inputType'] == 'input' &&
        inputConfig['type'] == 'date'
      ) {
        dataCopy[inputConfig['name']] = (
          dataCopy[inputConfig['name']] as string
        ).split('T')[0];
      }
    }
    return dataCopy;
  }
}
