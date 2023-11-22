import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoSolicitudesComponent } from './documento-solicitudes.component';

describe('DocumentoSolicitudesComponent', () => {
  let component: DocumentoSolicitudesComponent;
  let fixture: ComponentFixture<DocumentoSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
