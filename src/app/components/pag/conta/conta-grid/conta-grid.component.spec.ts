import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaGridComponent } from './conta-grid.component';

describe('ContaGridComponent', () => {
  let component: ContaGridComponent;
  let fixture: ComponentFixture<ContaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
