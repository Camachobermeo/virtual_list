import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalFormularioComponent } from './sucursal-formulario.component';

describe('SucursalFormularioComponent', () => {
  let component: SucursalFormularioComponent;
  let fixture: ComponentFixture<SucursalFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
