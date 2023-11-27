import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCdpComponent } from './solicitud-cdp.component';

describe('SolicitudCdpComponent', () => {
  let component: SolicitudCdpComponent;
  let fixture: ComponentFixture<SolicitudCdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudCdpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudCdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
