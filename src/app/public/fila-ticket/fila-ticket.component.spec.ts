import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaTicketComponent } from './fila-ticket.component';

describe('FilaTicketComponent', () => {
  let component: FilaTicketComponent;
  let fixture: ComponentFixture<FilaTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilaTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
