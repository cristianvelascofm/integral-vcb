import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoVcbComponent } from './documento-vcb.component';

describe('DocumentoVcbComponent', () => {
  let component: DocumentoVcbComponent;
  let fixture: ComponentFixture<DocumentoVcbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoVcbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoVcbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
