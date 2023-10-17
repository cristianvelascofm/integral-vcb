import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoCrearComponent } from './evento-crear.component';

describe('EventoCrearComponent', () => {
  let component: EventoCrearComponent;
  let fixture: ComponentFixture<EventoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
