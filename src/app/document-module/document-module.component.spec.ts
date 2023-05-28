import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentModuleComponent } from './document-module.component';

describe('DocumentModuleComponent', () => {
  let component: DocumentModuleComponent;
  let fixture: ComponentFixture<DocumentModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
