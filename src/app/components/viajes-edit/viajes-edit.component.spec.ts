import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesEditComponent } from './viajes-edit.component';

describe('ViajesEditComponent', () => {
  let component: ViajesEditComponent;
  let fixture: ComponentFixture<ViajesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
