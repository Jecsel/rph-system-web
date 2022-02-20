import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalListComponent } from './clinical-list.component';

describe('ClinicalListComponent', () => {
  let component: ClinicalListComponent;
  let fixture: ComponentFixture<ClinicalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
