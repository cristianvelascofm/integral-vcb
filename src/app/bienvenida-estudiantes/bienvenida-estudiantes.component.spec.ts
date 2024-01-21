import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaEstudiantesComponent } from './bienvenida-estudiantes.component';

describe('BienvenidaEstudiantesComponent', () => {
  let component: BienvenidaEstudiantesComponent;
  let fixture: ComponentFixture<BienvenidaEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienvenidaEstudiantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
