import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotemListadoComponent } from './totem-listado.component';

describe('TotemListadoComponent', () => {
  let component: TotemListadoComponent;
  let fixture: ComponentFixture<TotemListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotemListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotemListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
