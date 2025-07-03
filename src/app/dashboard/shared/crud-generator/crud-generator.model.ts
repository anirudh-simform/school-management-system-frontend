import { InjectionToken } from '@angular/core';
import { BaseCRUDService } from '../BaseCRUDService/BaseCRUDService';
import { IGenericCrudService } from '../BaseCRUDService/BaseCRUD.model';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export type InputType = 'input' | 'select' | 'multiselect';
export type FieldType = 'text' | 'date' | 'number' | 'email';
export type CRUDMethod = 'POST' | 'PUT';

export type Field =
  | {
      label: string;
      inputType: 'input';
      type: FieldType;
      defaultValue: string | number | Date;
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
    }
  | {
      label: string;
      inputType: 'multiselect';
      type: FieldType;
      defaultValue: number[];
      fetchServiceToken: InjectionToken<IGenericCrudService>;
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
    }
  | {
      label: string;
      inputType: 'select';
      type: FieldType;
      defaultValue: number;
      fetchServiceToken: InjectionToken<IGenericCrudService>;
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
