import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriaComponent } from './feria.component';

describe('FeriaComponent', () => {
  let component: FeriaComponent;
  let fixture: ComponentFixture<FeriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
