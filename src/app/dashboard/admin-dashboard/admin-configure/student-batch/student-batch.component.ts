import { Component } from '@angular/core';

import {
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { DatePipe } from '@angular/common';
import { StudentBatchService } from './service/student-batch.service';
import { ProgramService } from '../../admin-courses-and-program/programs/service/program.service';
import { CrudGeneratorComponent } from '../../../shared/crud-generator/crud-generator.component';
import { CRUDConfig } from '../../../shared/crud-generator/crud-generator.model';
import {
  STUDENT_BATCH_SERVICE_TOKEN,
  GRADE_LEVEL_SERVICE_TOKEN,
  PROGRAM_SERVICE_TOKEN,
} from '../../../../tokens';
import { GradeLevelService } from '../grade-level/services/grade-level.service';

@Component({
  selector: 'app-student-batch',
  imports: [ReactiveFormsModule, DatePipe, CrudGeneratorComponent],
  providers: [
    {
      provide: STUDENT_BATCH_SERVICE_TOKEN,
      useExisting: StudentBatchService,
    },
    {
      provide: GRADE_LEVEL_SERVICE_TOKEN,
      useExisting: GradeLevelService,
    },
    {
      provide: PROGRAM_SERVICE_TOKEN,
      useExisting: ProgramService,
    },
  ],
  templateUrl: './student-batch.component.html',
  styleUrl: './student-batch.component.css',
})
export class StudentBatchComponent {
  //   private studentBatchService = inject(StudentBatchService);
  //   private programService = inject(ProgramService);
  //   @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  //   @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  //   @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  //   @ViewChild('editDialogForm')
  //   private editDialogForm!: ElementRef<HTMLFormElement>;
  //   private batchToEdit: number | undefined;
  //   allPrograms: GetAllProgramsResponse['programs'] = [];
  //   formBuilder = new FormBuilder();
  //   form = this.formBuilder.group({
  //     name: [
  //       '',
  //       {
  //         validators: [Validators.required],
  //       },
  //     ],
  //     dates: this.formBuilder.group(
  //       {
  //         startDate: [
  //           '',
  //           {
  //             validators: [Validators.required],
  //           },
  //         ],
  //         endDate: [
  //           '',
  //           {
  //             validators: [Validators.required],
  //           },
  //         ],
  //       },
  //       {
  //         validators: [dateValidator],
  //       }
  //     ),
  //     program: [''],
  //   });
  //   studentBatches: GetAllStudentBatchesResponse = [];
  //   ngOnInit(): void {
  //     this.studentBatchService.getAllStudentBatches().subscribe((data) => {
  //       this.studentBatches = data;
  //     });
  //   }
  //   openModal() {
  //     this.programService.getAllPrograms().subscribe((data) => {
  //       this.allPrograms = data;
  //       console.log(data);
  //       this.dialog.nativeElement.showModal();
  //     });
  //   }
  //   closeModal(event: MouseEvent) {
  //     event.preventDefault();
  //     this.dialog.nativeElement.close();
  //     this.dialogForm.nativeElement.reset();
  //   }
  //   onSubmit(event: Event) {
  //     if (this.form.invalid) {
  //       event.preventDefault();
  //       return;
  //     }
  //     const requestBody: StudentBatchRequest = {
  //       name: this.form.value.name!,
  //       startDate: new Date(this.form.value.dates!.startDate!),
  //       endDate: new Date(this.form.value.dates!.endDate!),
  //       programId: Number(this.form.value.program!),
  //     };
  //     this.studentBatchService
  //       .createStudentBatch(requestBody)
  //       .subscribe((data) => {
  //         this.studentBatches = data.studentBatches;
  //       });
  //     this.dialog.nativeElement.close();
  //     this.dialogForm.nativeElement.reset();
  //   }
  //   openEditModal(
  //     batchId: number,
  //     name: string,
  //     startDate: Date,
  //     endDate: Date,
  //     programId: number
  //   ) {
  //     const formattedStartDate = startDate.toString().split('T')[0];
  //     const formattedEndDate = endDate.toString().split('T')[0];
  //     this.form.controls.name.setValue(name);
  //     this.form.controls.dates.controls.startDate.setValue(formattedStartDate);
  //     this.form.controls.dates.controls.endDate.setValue(formattedEndDate);
  //     this.form.controls.program.setValue(programId.toString());
  //     this.programService.getAllPrograms().subscribe((data) => {
  //       this.allPrograms = data;
  //       console.log(data);
  //       this.editDialog.nativeElement.showModal();
  //     });
  //     this.batchToEdit = batchId;
  //   }
  //   onEditStudentBatch(event: Event) {
  //     if (this.form.invalid) {
  //       event.preventDefault();
  //       return;
  //     }
  //     const requestBody: StudentBatchRequest = {
  //       name: this.form.value.name!,
  //       startDate: new Date(this.form.value.dates!.startDate!),
  //       endDate: new Date(this.form.value.dates!.endDate!),
  //       programId: Number(this.form.value.program!),
  //     };
  //     if (this.batchToEdit) {
  //       this.studentBatchService
  //         .editStudentBatch(this.batchToEdit, requestBody)
  //         .subscribe((data) => {
  //           this.studentBatches = data.studentBatches;
  //         });
  //     }
  //   }
  //   closeEditModal(event: MouseEvent) {
  //     event.preventDefault();
  //     this.editDialog.nativeElement.close();
  //     this.editDialogForm.nativeElement.reset();
  //   }
  //   onDeleteStudentBatch(id: number) {
  //     this.studentBatchService.deleteStudentBatch(id).subscribe((data) => {
  //       this.studentBatches = data.studentBatches;
  //     });
  //   }

  studentBatchService = STUDENT_BATCH_SERVICE_TOKEN;
  config: CRUDConfig = {
    POST: [
      {
        name: 'name',
        label: 'Student Batch Name',
        inputType: 'input',
        type: 'text',
        defaultValue: '',
        validators: [Validators.required],
      },
      {
        name: 'startDate',
        label: 'Batch Start Date',
        inputType: 'input',
        type: 'date',
        defaultValue: Date.now(),
        validators: [Validators.required],
      },
      {
        name: 'endDate',
        label: 'Batch End Date',
        inputType: 'input',
        type: 'date',
        defaultValue: Date.now(),
        validators: [Validators.required],
      },
      {
        name: 'program',
        label: 'Program',
        inputType: 'autocomplete',
        defaultValue: 0,
        fetchServiceToken: PROGRAM_SERVICE_TOKEN,
        optionLabel: 'name',
        optionValue: 'id',
      },
      {
        name: 'gradeLevel',
        label: 'Grade Level',
        inputType: 'autocomplete',
        defaultValue: 0,
        fetchServiceToken: GRADE_LEVEL_SERVICE_TOKEN,
        optionLabel: 'name',
        optionValue: 'id',
      },
    ],
    PUT: [],
  };
}

function dateValidator(dateControl: AbstractControl) {
  const startDate = dateControl.get('startDate')?.value as string;
  const endDate = dateControl.get('endDate')?.value as string;

  const startDateObject = new Date(startDate);
  const endDateObject = new Date(endDate);

  if (startDateObject > endDateObject) {
    return { startDateGreaterThanEndDate: true };
  } else if (
    startDateObject.getTime() === endDateObject.getTime() &&
    startDateObject.getTime() !== null &&
    endDateObject.getTime() !== null
  ) {
    return { startDateEqualToEndDate: true };
  } else {
    return null;
  }
}
