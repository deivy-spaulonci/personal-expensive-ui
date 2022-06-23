import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnBtActionComponent } from './column-bt-action.component';

describe('ColumnBtActionComponent', () => {
  let component: ColumnBtActionComponent;
  let fixture: ComponentFixture<ColumnBtActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnBtActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnBtActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
