import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmCalculatorComponent } from './sm-calculator.component';

describe('SmCalculatorComponent', () => {
  let component: SmCalculatorComponent;
  let fixture: ComponentFixture<SmCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
