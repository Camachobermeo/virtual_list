import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaFormularioComponent } from './tienda-formulario.component';

describe('TiendaFormularioComponent', () => {
  let component: TiendaFormularioComponent;
  let fixture: ComponentFixture<TiendaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
