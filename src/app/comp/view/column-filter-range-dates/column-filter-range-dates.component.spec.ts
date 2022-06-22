import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFilterRangeDatesComponent } from './column-filter-range-dates.component';

describe('ColumnFilterRangeDatesComponent', () => {
  let component: ColumnFilterRangeDatesComponent;
  let fixture: ComponentFixture<ColumnFilterRangeDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnFilterRangeDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnFilterRangeDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
