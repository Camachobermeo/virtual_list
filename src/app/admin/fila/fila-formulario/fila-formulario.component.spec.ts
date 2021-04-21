import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaFormularioComponent } from './fila-formulario.component';

describe('FilaFormularioComponent', () => {
  let component: FilaFormularioComponent;
  let fixture: ComponentFixture<FilaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilaFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
