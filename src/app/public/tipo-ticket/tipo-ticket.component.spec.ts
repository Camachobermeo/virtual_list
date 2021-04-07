import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTicketComponent } from './tipo-ticket.component';

describe('TipoTicketComponent', () => {
  let component: TipoTicketComponent;
  let fixture: ComponentFixture<TipoTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
