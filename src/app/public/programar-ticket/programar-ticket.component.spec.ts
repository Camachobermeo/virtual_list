import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramarTicketComponent } from './programar-ticket.component';

describe('ProgramarTicketComponent', () => {
  let component: ProgramarTicketComponent;
  let fixture: ComponentFixture<ProgramarTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramarTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramarTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
