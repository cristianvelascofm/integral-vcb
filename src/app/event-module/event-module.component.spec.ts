import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModuleComponent } from './event-module.component';

describe('EventModuleComponent', () => {
  let component: EventModuleComponent;
  let fixture: ComponentFixture<EventModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
