import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpService } from '../../../../http.service';
import { type GetAllStudentBatchesResponse } from './student-batch.model';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProgramResponse } from '../../admin-courses-and-program/programs/programs.model';
import { StudentBatchRequest } from './student-batch.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-batch',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './student-batch.component.html',
  styleUrl: './student-batch.component.css',
})
export class StudentBatchComponent implements OnInit {
  private http = inject(HttpService);
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogForm') private dialogForm!: ElementRef<HTMLFormElement>;
  @ViewChild('editDialog') private editDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('editDialogForm')
  private editDialogForm!: ElementRef<HTMLFormElement>;
  private batchToEdit: number | undefined;
  allPrograms: ProgramResponse['programs'] = [];

  formBuilder = new FormBuilder();

  form = this.formBuilder.group({
    name: [
      '',
      {
        validators: [Validators.required],
      },
    ],

    dates: this.formBuilder.group({
      startDate: [
        '',
        {
          validators: [Validators.required],
        },
      ],

      endDate: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    }),

    program: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });

  studentBatches: GetAllStudentBatchesResponse = [];

  ngOnInit(): void {
    this.http.getAllStudentBatches().subscribe((data) => {
      this.studentBatches = data;
    });
  }

  openModal() {
    this.http.getAllPrograms().subscribe((data) => {
      this.allPrograms = data;
      console.log(data);
      this.dialog.nativeElement.showModal();
    });
  }

  closeModal(event: MouseEvent) {
    event.preventDefault();
    this.dialog.nativeElement.close();
    this.dialogForm.nativeElement.reset();
  }

  onSubmit() {
    const requestBody: StudentBatchRequest = {
      name: this.form.value.name!,
      startDate: new Date(this.form.value.dates!.startDate!),
      endDate: new Date(this.form.value.dates!.endDate!),
      programId: Number(this.form.value.program!),
    };

    this.http.createStudentBatch(requestBody).subscribe((data) => {
      this.studentBatches = data.studentBatches;
    });

    this.dialog.nativeElement.close();
    this.dialogForm.nativeElement.reset();
  }

  openEditModal(
    batchId: number,
    name: string,
    startDate: Date,
    endDate: Date,
    programId: number
  ) {
    const formattedStartDate = startDate.toString().split('T')[0];
    const formattedEndDate = endDate.toString().split('T')[0];

    this.form.controls.name.setValue(name);
    this.form.controls.dates.controls.startDate.setValue(formattedStartDate);
    this.form.controls.dates.controls.endDate.setValue(formattedEndDate);
    this.form.controls.program.setValue(programId.toString());
    this.http.getAllPrograms().subscribe((data) => {
      this.allPrograms = data;
      console.log(data);
      this.editDialog.nativeElement.showModal();
    });
    this.batchToEdit = batchId;
  }

  onEditStudentBatch() {
    const requestBody: StudentBatchRequest = {
      name: this.form.value.name!,
      startDate: new Date(this.form.value.dates!.startDate!),
      endDate: new Date(this.form.value.dates!.endDate!),
      programId: Number(this.form.value.program!),
    };

    if (this.batchToEdit) {
      this.http
        .editStudentBatch(this.batchToEdit, requestBody)
        .subscribe((data) => {
          this.studentBatches = data.studentBatches;
        });
    }
  }

  closeEditModal(event: MouseEvent) {
    event.preventDefault();
    this.editDialog.nativeElement.close();
    this.editDialogForm.nativeElement.reset();
  }

  onDeleteStudentBatch(id: number) {
    this.http.deleteStudentBatch(id).subscribe((data) => {
      this.studentBatches = data.studentBatches;
    });
  }
}
