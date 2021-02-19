import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOperacionListadoComponent } from './tipo-operacion-listado.component';

describe('TipoOperacionListadoComponent', () => {
  let component: TipoOperacionListadoComponent;
  let fixture: ComponentFixture<TipoOperacionListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoOperacionListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoOperacionListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
