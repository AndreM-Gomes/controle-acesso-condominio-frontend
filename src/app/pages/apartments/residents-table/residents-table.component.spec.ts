import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsTableComponent } from './residents-table.component';

describe('ResidentsTableComponent', () => {
  let component: ResidentsTableComponent;
  let fixture: ComponentFixture<ResidentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
