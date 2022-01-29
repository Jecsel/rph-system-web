import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalRecordComponent } from './clinical-record.component';

describe('ClinicalRecordComponent', () => {
  let component: ClinicalRecordComponent;
  let fixture: ComponentFixture<ClinicalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
