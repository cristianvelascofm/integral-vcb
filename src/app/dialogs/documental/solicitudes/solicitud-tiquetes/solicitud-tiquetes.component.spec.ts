import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudTiquetesComponent } from './solicitud-tiquetes.component';

describe('SolicitudTiquetesComponent', () => {
  let component: SolicitudTiquetesComponent;
  let fixture: ComponentFixture<SolicitudTiquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudTiquetesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudTiquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
