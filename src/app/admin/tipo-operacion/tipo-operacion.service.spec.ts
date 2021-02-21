import { TestBed } from '@angular/core/testing';

import { TipoOperacionService } from './tipo-operacion.service';

describe('TipoOperacionService', () => {
  let service: TipoOperacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoOperacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
