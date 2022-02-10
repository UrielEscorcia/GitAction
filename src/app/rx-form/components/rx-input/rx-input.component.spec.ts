import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxInputComponent } from './rx-input.component';

describe('RxInputComponent', () => {
  let component: RxInputComponent;
  let fixture: ComponentFixture<RxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
