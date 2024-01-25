import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DaysService } from '../shared/days.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  selectedDayIndex!: number;

  constructor(private daysService: DaysService) {}

  ngOnInit() {
    this.subscription = this.daysService.dayChanged.subscribe(
      (index: number) => {
        this.selectedDayIndex = index;
      }
    );

    this.selectedDayIndex = this.daysService.getSelectedDayIndex();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
