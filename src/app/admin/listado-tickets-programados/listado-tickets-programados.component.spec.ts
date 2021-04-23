import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTicketsProgramadosComponent } from './listado-tickets-programados.component';

describe('ListadoTicketsProgramadosComponent', () => {
  let component: ListadoTicketsProgramadosComponent;
  let fixture: ComponentFixture<ListadoTicketsProgramadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTicketsProgramadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTicketsProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
