import { TestBed } from '@angular/core/testing';

import { StudentBatchService } from './student-batch.service';

describe('StudentBatchService', () => {
  let service: StudentBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
