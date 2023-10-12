import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoActividadComponent } from './evento-actividad.component';

describe('EventoActividadComponent', () => {
  let component: EventoActividadComponent;
  let fixture: ComponentFixture<EventoActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoActividadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
