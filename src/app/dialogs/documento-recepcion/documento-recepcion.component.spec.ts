import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoRecepcionComponent } from './documento-recepcion.component';

describe('DocumentoRecepcionComponent', () => {
  let component: DocumentoRecepcionComponent;
  let fixture: ComponentFixture<DocumentoRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoRecepcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
