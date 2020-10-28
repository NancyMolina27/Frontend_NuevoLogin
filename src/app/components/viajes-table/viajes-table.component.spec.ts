import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesTableComponent } from './viajes-table.component';

describe('ViajesTableComponent', () => {
  let component: ViajesTableComponent;
  let fixture: ComponentFixture<ViajesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
