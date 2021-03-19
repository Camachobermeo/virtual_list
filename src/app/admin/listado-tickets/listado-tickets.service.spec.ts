import { TestBed } from '@angular/core/testing';

import { ListadoTicketsService } from './listado-tickets.service';

describe('ListadoTicketsService', () => {
  let service: ListadoTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
