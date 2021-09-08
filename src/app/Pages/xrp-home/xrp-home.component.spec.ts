import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XrpHomeComponent } from './xrp-home.component';

describe('XrpHomeComponent', () => {
  let component: XrpHomeComponent;
  let fixture: ComponentFixture<XrpHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XrpHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XrpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
