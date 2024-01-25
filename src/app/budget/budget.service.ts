import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  weeklyBudgetChanged = new BehaviorSubject<number>(null);
  weeklyBudget!: number;

  setWeeklyBudget(newBudget: number) {
    this.weeklyBudget = newBudget;

    this.weeklyBudgetChanged.next(newBudget);
  }

  getWeeklyBudget() {
    return this.weeklyBudget;
  }
}
