import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEntregaSouvenirComponent } from './registrar-entrega-souvenir.component';

describe('RegistrarEntregaSouvenirComponent', () => {
  let component: RegistrarEntregaSouvenirComponent;
  let fixture: ComponentFixture<RegistrarEntregaSouvenirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarEntregaSouvenirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarEntregaSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
