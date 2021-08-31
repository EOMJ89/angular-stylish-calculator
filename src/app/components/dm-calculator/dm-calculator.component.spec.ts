import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCalculatorComponent } from './dm-calculator.component';

describe('DmCalculatorComponent', () => {
  let component: DmCalculatorComponent;
  let fixture: ComponentFixture<DmCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
