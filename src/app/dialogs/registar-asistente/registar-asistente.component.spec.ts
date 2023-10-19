import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarAsistenteComponent } from './registar-asistente.component';

describe('RegistarAsistenteComponent', () => {
  let component: RegistarAsistenteComponent;
  let fixture: ComponentFixture<RegistarAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistarAsistenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistarAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
