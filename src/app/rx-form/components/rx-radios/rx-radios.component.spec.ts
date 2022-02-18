import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxRadiosComponent } from './rx-radios.component';

describe('RxRadiosComponent', () => {
  let component: RxRadiosComponent;
  let fixture: ComponentFixture<RxRadiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxRadiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxRadiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
