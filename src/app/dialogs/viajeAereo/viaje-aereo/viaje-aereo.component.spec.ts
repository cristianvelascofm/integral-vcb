import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeAereoComponent } from './viaje-aereo.component';

describe('ViajeAereoComponent', () => {
  let component: ViajeAereoComponent;
  let fixture: ComponentFixture<ViajeAereoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajeAereoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViajeAereoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
