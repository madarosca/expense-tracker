import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from './budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  weeklyBudget!: number;
  editBudget: boolean = false;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.weeklyBudget = this.budgetService.getWeeklyBudget();
  }

  onEdit() {
    this.editBudget = true;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newBudget = form.value.weeklyBudget;
      this.weeklyBudget = newBudget;
      this.budgetService.setWeeklyBudget(newBudget);
    }

    this.editBudget = false;
    form.reset();
  }
}
