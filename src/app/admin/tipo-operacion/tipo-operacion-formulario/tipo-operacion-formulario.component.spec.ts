import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOperacionFormularioComponent } from './tipo-operacion-formulario.component';

describe('TipoOperacionFormularioComponent', () => {
  let component: TipoOperacionFormularioComponent;
  let fixture: ComponentFixture<TipoOperacionFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOperacionFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoOperacionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
