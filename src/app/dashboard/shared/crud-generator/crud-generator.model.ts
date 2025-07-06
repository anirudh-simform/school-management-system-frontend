import { InjectionToken } from '@angular/core';
import { BaseCRUDService } from '../BaseCRUDService/BaseCRUDService';
import { IGenericCrudService } from '../BaseCRUDService/BaseCRUD.model';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { MultiSelectFilterEvent } from 'primeng/multiselect';
import { Subject } from 'rxjs';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

export type InputType = 'input' | 'select' | 'multiselect' | 'autocomplete';
export type FieldType = 'text' | 'date' | 'number' | 'email' | 'radio';
export type CRUDMethod = 'POST' | 'PUT';

export type Field =
  | {
      name: string;
      label: string;
      inputType: 'input';
      type: FieldType;
      defaultValue: string | number | Date;
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
    }
  | {
      name: string;
      label: string;
      inputType: 'input';
      type: 'radio';
      defaultValue: string;
      options: { label: string; value: string }[];
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
    }
  | {
      name: string;
      label: string;
      inputType: 'multiselect';
      defaultValue: number[];
      fetchServiceToken: InjectionToken<IGenericCrudService>;
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
      optionValue: string;
      optionLabel: string;
    }
  | {
      name: string;
      label: string;
      inputType: 'autocomplete';
      defaultValue: number;
      fetchServiceToken: InjectionToken<IGenericCrudService>;
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
      optionValue: string;
      optionLabel: string;
    }
  | {
      name: string;
      label: string;
      inputType: 'select';
      defaultValue: string;
      options: { label: string; value: string }[];
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
    };

export type CRUDConfig = {
  [key in CRUDMethod]: Field[];
};

const s = {
  POST: [
    {
      label: 'name',
      inputType: 'input',
      type: 'text',
    },
    {
      label: 'description',
      inputType: 'input',
      type: 'text',
    },
    {
      label: 'startDate',
      inputType: 'input',
      type: 'date',
    },
    {
      label: 'endDate',
      inputType: 'input',
      type: 'date',
    },
    {
      label: 'gradeLevel',
      inputType: 'select',
      type: 'text',
      fetchService: 'someInstanceOfService',
    },
    {
      label: 'programs',
      inputType: 'multiselect',
      type: 'text',
      fetchService: 'someInstanceOfService',
    },
  ],

  PUT: [
    {
      label: 'name',
      inputType: 'input',
      type: 'text',
    },
    {
      label: 'description',
      inputType: 'input',
      type: 'text',
    },
    {
      label: 'startDate',
      inputType: 'input',
      type: 'date',
    },
    {
      label: 'endDate',
      inputType: 'input',
      type: 'date',
    },
    {
      label: 'gradeLevel',
      inputType: 'select',
      type: 'text',
      fetchService: BaseCRUDService,
    },
    {
      label: 'programs',
      inputType: 'multiselect',
      type: 'text',
      fetchService: BaseCRUDService,
    },
  ],
};

export type InnerServiceMapObject =
  | {
      inputType: 'multiselect';
      service: IGenericCrudService;
      subject: Subject<string>;
      options: Record<string, string>[];
      onFilter: (event: MultiSelectFilterEvent) => void;
    }
  | {
      inputType: 'autocomplete';
      service: IGenericCrudService;
      subject: Subject<string>;
      options: Record<string, string>[];
      onFilter: (event: AutoCompleteCompleteEvent) => void;
    };

export type FilterEventFunction =
  | ((event: MultiSelectFilterEvent) => void)
  | ((event: string) => void);
