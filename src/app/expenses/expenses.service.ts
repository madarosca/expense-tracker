import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Expense, NewExpense } from './expense.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class ExpensesService {
  expensesChanged = new Subject<Expense[]>();
  selectedExpenseChanged = new Subject<Expense>();
  totalExpenses: number = 0;
  expensesByDay: Expense[] = [];
  selectedDay: string = '';
  selectedExpense!: Expense;

  private expenses: { [key: string]: Expense[] } = {
    monday: [
      new Expense('Groceries', 500, uuidv4(), '#b2745e'),
      new Expense('Clothes', 350, uuidv4(), 'indianred'),
      new Expense('Baby', 468, uuidv4(), 'pink'),
    ],
    tuesday: [
      new Expense('Health', 234, uuidv4(), 'seagreen'),
      new Expense('Sanitary', 120, uuidv4(), 'mediumpurple'),
    ],
    wednesday: [new Expense('Groceries', 260, uuidv4(), '#b2745e')],
    thursday: [],
    friday: [
      new Expense('Beauty', 250, uuidv4(), 'sandybrown'),
      new Expense('Rent', 1000, uuidv4(), 'lightgoldenrodyellow'),
    ],
    saturday: [],
    sunday: [new Expense('Restaurants', 300, uuidv4(), 'darkturquoise')],
  };

  setExpensesByDay(selectedDay: string) {
    let expensesByDay = [];
    const expenses = this.expenses;

    if (selectedDay === 'budget') {
      return;
    }
    if (selectedDay === 'summary') {
      expensesByDay = Object.keys(expenses)
        .map(function (item) {
          return expenses[item].length
            ? expenses[item].map((val) => {
                return { ...val, day: item };
              })
            : [{ day: item }];
        })
        .flat();
    } else {
      expensesByDay = this.expenses[selectedDay];
    }

    this.selectedDay = selectedDay;
    this.expensesByDay = expensesByDay;
    this.expensesChanged.next(this.expensesByDay.slice());
  }

  setExpense(id: string) {
    const selected = this.expensesByDay.find((expense) => expense.id === id);

    if (selected) {
      this.selectedExpense =
        this.selectedExpense && this.selectedExpense.id === selected.id
          ? null
          : selected;

      this.selectedExpenseChanged.next(this.selectedExpense);
    }
  }

  getExpensesByDay() {
    return this.expensesByDay.slice();
  }

  getAllExpenses() {
    return this.expenses;
  }

  getTotalExpenses() {
    const total = this.expensesByDay.reduce((prev, current) => {
      const prevValue = !!prev ? prev : 0;
      const curentValue = !!current.amount ? current.amount : 0;
      return prevValue + curentValue;
    }, 0);

    return total;
  }

  getExpense() {
    return this.selectedExpense;
  }

  addExpense(expense: NewExpense) {
    const newExpense = { ...expense, id: uuidv4(), color: 'grey' };
    this.expenses[this.selectedDay] = [
      ...this.expenses[this.selectedDay],
      newExpense,
    ];
    this.expensesByDay.push(newExpense);
    this.expensesChanged.next(this.expensesByDay.slice());
  }

  editExpense(newExpense: Expense) {
    this.expenses[this.selectedDay] = this.expenses[this.selectedDay].map(
      (expense) =>
        expense.id === newExpense.id ? { ...expense, ...newExpense } : expense
    );
    this.expensesByDay = this.expenses[this.selectedDay];
    this.expensesChanged.next(this.expensesByDay.slice());
  }

  deleteExpense(index: number) {
    this.expensesByDay.splice(index, 1);
    this.expensesChanged.next(this.expensesByDay.slice());
  }
}
