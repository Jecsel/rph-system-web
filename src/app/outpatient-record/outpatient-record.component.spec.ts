import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpatientRecordComponent } from './outpatient-record.component';

describe('OutpatientRecordComponent', () => {
  let component: OutpatientRecordComponent;
  let fixture: ComponentFixture<OutpatientRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutpatientRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutpatientRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
