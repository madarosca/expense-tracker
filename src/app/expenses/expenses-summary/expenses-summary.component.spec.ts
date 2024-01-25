import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSummaryComponent } from './expenses-summary.component';

describe('ExpensesSummaryComponent', () => {
  let component: ExpensesSummaryComponent;
  let fixture: ComponentFixture<ExpensesSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensesSummaryComponent]
    });
    fixture = TestBed.createComponent(ExpensesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
