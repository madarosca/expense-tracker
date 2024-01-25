import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DaysService } from '../../shared/days.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  selectedIndex: number = 0;

  constructor(private daysService: DaysService) {}

  ngOnInit() {
    this.subscription = this.daysService.dayChanged.subscribe(
      (index: number) => {
        this.selectedIndex = index;
      }
    );
  }

  onItemClick(index: number) {
    this.daysService.setSelectedDay(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
