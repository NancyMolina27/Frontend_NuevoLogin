import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreoformsComponent } from './rastreoforms.component';

describe('RastreoformsComponent', () => {
  let component: RastreoformsComponent;
  let fixture: ComponentFixture<RastreoformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RastreoformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreoformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
