import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaListadoComponent } from './tienda-listado.component';

describe('TiendaListadoComponent', () => {
  let component: TiendaListadoComponent;
  let fixture: ComponentFixture<TiendaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
