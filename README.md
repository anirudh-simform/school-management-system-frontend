# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## CRUD Generator

This project uses a custom CRUD generator in some components.

The CRUD generator component is a reusable component that generates the complete UI for all CRUD operations and also wires up any necessary services required for the proper functioning of the component.

This component uses a configuration object that defines the fields needed for POST and PUT operations, along with all the details regarding each field.

The snippet below shows the TypeScript types for the configuration object:

```typescript
type InputType = "input" | "select" | "multiselect" | "autocomplete";
type FieldType = "text" | "date" | "number" | "email" | "radio" | "password";

type CRUDMethod = "POST" | "PUT";

type Field =
  | {
      name: string;
      label: string;
      inputType: "input";
      type: FieldType;
      defaultValue: string | number | Date;
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
    }
  | {
      name: string;
      label: string;
      inputType: "input";
      type: "radio";
      defaultValue: string;
      options: { label: string; value: string }[];
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
    }
  | {
      name: string;
      label: string;
      inputType: "multiselect";
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
      inputType: "autocomplete";
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
      inputType: "select";
      defaultValue: string;
      options: { label: string; value: string }[];
      validators?: ValidatorFn[];
      asyncValidators?: AsyncValidatorFn[];
    };

type CRUDConfig = {
  [key in CRUDMethod]: Field[];
};
```

- `InputType` specifies the type of input rendered in the template. The available input types are:

  - `multiselect`: Renders a list of options with support for selecting multiple options and searching via a backend API. Only dynamic options are supported (options are fetched from the backend).

    > Requires a service that extends `BaseCRUDService`, which is used to interact with the backend API.

  - `autocomplete`: Renders a searchable list of options with support for selecting a single option, using a backend API. Only dynamic options are supported (options are fetched from the backend).

    > Requires a service that extends `BaseCRUDService`, which is used to interact with the backend API.

  - `select`: Renders a static list of options with support for selecting a single option.

  - `input`: Renders a standard HTML input, except when the `type` is **radio**. In that case, the generator renders a PrimeNG component instead of a regular HTML radio button.

- `label` is the text displayed between the `<label>` tags for each input.

- `defaultValue` is the initial value assigned to the underlying reactive form control.

- `validators` and `asyncValidators` are arrays of validation functions used directly with Angular reactive forms.

- `fetchServiceToken` is an `InjectionToken` that provides the service responsible for backend interactions required by the component.

- `optionValue` is the property name in the backend response that represents the value of each option. The component uses this to render the list of options and handle selections.

- `optionLabel` is the property name in the backend response that represents the label for each option. The component uses this as the display label for options in `multiselect` and `autocomplete` inputs.

- `type` is the type of the html input.
