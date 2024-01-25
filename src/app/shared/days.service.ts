import { Injectable } from '@angular/core';
import { Day } from './day.model';
import { Subject } from 'rxjs';
import { ExpensesService } from '../expenses/expenses.service';

@Injectable({ providedIn: 'root' })
export class DaysService {
  dayChanged = new Subject<number>();
  selectedDayIndex: number = 0;
  selectedDayId: string = '';

  private days: Day[] = [
    new Day('budget', 'budget'),
    new Day('monday', 'mon'),
    new Day('tuesday', 'tue'),
    new Day('wednesday', 'wed'),
    new Day('thursday', 'thu'),
    new Day('friday', 'fri'),
    new Day('saturday', 'sat'),
    new Day('sunday', 'sun'),
    new Day('summary', 'summary'),
  ];

  constructor(private expensesService: ExpensesService) {
    if (this.selectedDayIndex) {
      this.selectedDayId = this.getSelectedDayId(this.selectedDayIndex);
      this.expensesService.setExpensesByDay(this.selectedDayId);
    }
  }

  getDays() {
    return this.days.slice();
  }

  getSelectedDayIndex() {
    return this.selectedDayIndex;
  }

  getSelectedDayId(index: number) {
    return this.days[index].id;
  }

  setSelectedDay(index: number) {
    this.selectedDayIndex = index;
    this.selectedDayId = this.getSelectedDayId(index);
    this.expensesService.setExpensesByDay(this.selectedDayId);
    this.dayChanged.next(this.selectedDayIndex);
  }
}
