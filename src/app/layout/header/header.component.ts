import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DaysService } from '../../shared/days.service';
import { Day } from '../../shared/day.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  headerItems: Day[] = [];
  selectedIndex!: number;

  constructor(private daysService: DaysService) {}

  ngOnInit() {
    this.subscription = this.daysService.dayChanged.subscribe(
      (index: number) => {
        this.selectedIndex = index;
      }
    );
    this.selectedIndex = this.daysService.getSelectedDayIndex();
    this.headerItems = this.daysService.getDays();
  }

  onItemClick(index: number) {
    this.daysService.setSelectedDay(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
