import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboTipoComponent } from './combo-tipo.component';

describe('ComboTipoComponent', () => {
  let component: ComboTipoComponent;
  let fixture: ComponentFixture<ComboTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
