import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotemFormularioComponent } from './totem-formulario.component';

describe('TotemFormularioComponent', () => {
  let component: TotemFormularioComponent;
  let fixture: ComponentFixture<TotemFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotemFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotemFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
