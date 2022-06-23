import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaGridComponent } from './despesa-grid.component';

describe('DespesaGridComponent', () => {
  let component: DespesaGridComponent;
  let fixture: ComponentFixture<DespesaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespesaGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
