import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoInformesComponent } from './documento-informes.component';

describe('DocumentoInformesComponent', () => {
  let component: DocumentoInformesComponent;
  let fixture: ComponentFixture<DocumentoInformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoInformesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
