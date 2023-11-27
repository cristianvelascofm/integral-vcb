import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDocumentosVcbComponent } from './main-documentos-vcb.component';

describe('MainDocumentosVcbComponent', () => {
  let component: MainDocumentosVcbComponent;
  let fixture: ComponentFixture<MainDocumentosVcbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDocumentosVcbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDocumentosVcbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
