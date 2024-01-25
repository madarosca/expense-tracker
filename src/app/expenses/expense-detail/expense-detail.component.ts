import {
  Component,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { Subscription } from 'rxjs';
import { Expense } from '../expense.model';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css'],
})
export class ExpenseDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  expenses: Expense[] = [];
  @Output() expenseIsEditing: string;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.subscription = this.expensesService.expensesChanged.subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
      }
    );
    this.expenses = this.expensesService.getExpensesByDay();
  }

  onEditExpense(id: string) {
    this.expenseIsEditing = this.expenseIsEditing
      ? this.expenseIsEditing === id
        ? null
        : id
      : id;
    this.expensesService.setExpense(id);
  }

  onDeleteExpense(index: number) {
    this.expensesService.deleteExpense(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
