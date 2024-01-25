import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExpensesService } from '../expenses.service';
import { Expense } from '../expense.model';
import { exportPdf } from './../../shared/exportPdf';
import { exportExcel } from 'src/app/shared/exportExcel';
import { TableColumn, ExportColumn } from 'src/app/shared/column.model';
import { BudgetService } from 'src/app/budget/budget.service';

@Component({
  selector: 'app-expenses-summary',
  templateUrl: './expenses-summary.component.html',
  styleUrls: ['./expenses-summary.component.css'],
})
export class ExpensesSummaryComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  totalExpenses: number = 0;
  expenses!: Expense[];
  allExpenses!: { [key: string]: Expense[] };
  chartDataByCategory!: {};
  chartOptionsByCategory!: {};
  chartDataByDay!: {};
  chartOptionsByDay!: {};
  cols!: TableColumn[];
  exportColumns!: ExportColumn[];
  exportTitle: string = 'Weekly Expenses';
  weeklyBudget!: number;

  constructor(
    private expensesService: ExpensesService,
    private budgetService: BudgetService
  ) {}

  ngOnInit() {
    this.subscription = this.expensesService.expensesChanged.subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
        this.allExpenses = this.expensesService.getAllExpenses();
        this.totalExpenses = this.expensesService.getTotalExpenses();
      }
    );

    this.expenses = this.expensesService.getExpensesByDay();
    this.allExpenses = this.expensesService.getAllExpenses();
    this.totalExpenses = this.expensesService.getTotalExpenses();
    this.weeklyBudget = this.budgetService.getWeeklyBudget();

    this.getChartDataByCategory();
    this.getChartDataByDay();

    this.cols = [
      { field: 'day', header: 'Day' },
      { field: 'category', header: 'Category' },
      { field: 'amount', header: 'Amount' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getChartDataByCategory() {
    const chartValues = {};
    const chartColors = [];

    this.expenses.forEach(({ category, color }) => {
      if (category && !Object.keys(chartValues).includes(category)) {
        const categoryTotal = this.expenses.reduce((prev, current) => {
          if (current.category === category) {
            return prev + current.amount;
          }

          return prev;
        }, 0);
        chartValues[category] = categoryTotal;
      }
      if (color && !chartColors.includes(color)) {
        chartColors.push(color);
      }
    });

    this.chartDataByCategory = {
      labels: Object.keys(chartValues),
      datasets: [
        {
          data: Object.values(chartValues),
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors,
        },
      ],
    };

    this.chartOptionsByCategory = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };
  }

  getChartDataByDay() {
    const chartLabels = Object.keys(this.allExpenses);
    const chartValues = [];

    Object.keys(this.allExpenses).map((key) => {
      const totalByDay = this.allExpenses[key].reduce(
        (prev, current) => prev + current.amount,
        0
      );

      chartValues.push(totalByDay);
    });

    this.chartDataByDay = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Daily expenses',
          data: chartValues,
          fill: true,
          borderColor: '#2375ef',
          backgroundColor: 'rgb(23 84 175 / 20%)',
          tension: 0.4,
        },
      ],
    };

    this.chartOptionsByDay = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: '#7a000c',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'black',
          },
        },
        y: {
          ticks: {
            color: '#7a000c',
          },
        },
      },
    };
  }

  exportTableExcel() {
    const headings = [['Category', 'Amount', 'ID', 'Color', 'Day']];
    exportExcel(this.expenses, this.exportTitle, headings);
  }

  exportTablePdf() {
    exportPdf(this.exportColumns, this.expenses, this.exportTitle);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
