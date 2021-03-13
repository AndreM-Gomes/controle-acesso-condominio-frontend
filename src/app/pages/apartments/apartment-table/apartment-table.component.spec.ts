import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentTableComponent } from './apartment-table.component';

describe('ApartmentTableComponent', () => {
  let component: ApartmentTableComponent;
  let fixture: ComponentFixture<ApartmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
