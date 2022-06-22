import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFilterIdComponent } from './column-filter-id.component';

describe('ColumnFilterIdComponent', () => {
  let component: ColumnFilterIdComponent;
  let fixture: ComponentFixture<ColumnFilterIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnFilterIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnFilterIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
