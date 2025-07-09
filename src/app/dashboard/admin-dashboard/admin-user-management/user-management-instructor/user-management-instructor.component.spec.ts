import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementInstructorComponent } from './user-management-instructor.component';

describe('UserManagementInstructorComponent', () => {
  let component: UserManagementInstructorComponent;
  let fixture: ComponentFixture<UserManagementInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementInstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
