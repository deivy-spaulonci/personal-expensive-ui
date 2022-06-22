import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFilterTipoComponent } from './column-filter-tipo.component';

describe('ColumnFilterTipoComponent', () => {
  let component: ColumnFilterTipoComponent;
  let fixture: ComponentFixture<ColumnFilterTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnFilterTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnFilterTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
