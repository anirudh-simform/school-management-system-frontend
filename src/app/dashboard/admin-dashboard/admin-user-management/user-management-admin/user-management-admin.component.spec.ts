import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementAdminComponent } from './user-management-admin.component';

describe('UserManagementAdminComponent', () => {
  let component: UserManagementAdminComponent;
  let fixture: ComponentFixture<UserManagementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
