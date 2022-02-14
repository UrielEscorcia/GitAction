import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxSwitchComponent } from './rx-switch.component';

describe('RxSwitchComponent', () => {
  let component: RxSwitchComponent;
  let fixture: ComponentFixture<RxSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
