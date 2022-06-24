import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaChartComponent } from './despesa-chart.component';

describe('DespesaChartComponent', () => {
  let component: DespesaChartComponent;
  let fixture: ComponentFixture<DespesaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespesaChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
