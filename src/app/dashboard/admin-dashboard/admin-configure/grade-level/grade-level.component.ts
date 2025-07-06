import { Component } from '@angular/core';
import { GRADE_LEVEL_SERVICE_TOKEN } from '../../../../tokens';
import { GradeLevelService } from './services/grade-level.service';
import { CRUDConfig } from '../../../shared/crud-generator/crud-generator.model';
import { Validators } from '@angular/forms';
import { CrudGeneratorComponent } from '../../../shared/crud-generator/crud-generator.component';

@Component({
  selector: 'app-grade-level',
  imports: [CrudGeneratorComponent],
  providers: [
    {
      provide: GRADE_LEVEL_SERVICE_TOKEN,
      useExisting: GradeLevelService,
    },
  ],
  templateUrl: './grade-level.component.html',
  styleUrl: './grade-level.component.css',
})
export class GradeLevelComponent {
  gradeLevelService = GRADE_LEVEL_SERVICE_TOKEN;

  config: CRUDConfig = {
    POST: [
      {
        name: 'name',
        label: 'Level Name',
        inputType: 'input',
        type: 'text',
        defaultValue: '',
        validators: [Validators.required],
      },
      {
        name: 'levelOrder',
        label: 'Level Order',
        inputType: 'input',
        type: 'number',
        defaultValue: 0,
        validators: [Validators.required],
      },
    ],
    PUT: [],
  };
}
