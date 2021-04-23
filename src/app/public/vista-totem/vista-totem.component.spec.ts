import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTotemComponent } from './vista-totem.component';

describe('VistaTotemComponent', () => {
  let component: VistaTotemComponent;
  let fixture: ComponentFixture<VistaTotemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaTotemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaTotemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
