import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeLevelComponent } from './grade-level.component';

describe('GradeLevelComponent', () => {
  let component: GradeLevelComponent;
  let fixture: ComponentFixture<GradeLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
