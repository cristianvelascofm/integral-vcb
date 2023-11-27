import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeAdministrativoComponent } from './informe-administrativo.component';

describe('InformeAdministrativoComponent', () => {
  let component: InformeAdministrativoComponent;
  let fixture: ComponentFixture<InformeAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeAdministrativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
