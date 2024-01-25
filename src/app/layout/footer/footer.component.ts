import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DaysService } from '../../shared/days.service';
import { Day } from '../../shared/day.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  selectedIndex!: number;
  previous: string = '<< ';
  next: string = ' >>';

  constructor(private daysService: DaysService) {}

  ngOnInit() {
    const days = this.daysService.getDays();

    this.subscription = this.daysService.dayChanged.subscribe(
      (index: number) => {
        this.selectedIndex = index;
        this.getButtonsContent(index, days);
      }
    );

    this.selectedIndex = this.daysService.getSelectedDayIndex();
    this.getButtonsContent(this.selectedIndex, days);
  }

  getButtonsContent(index: number, days: Day[]) {
    this.previous =
      index === 0
        ? `${'<< ' + days[days.length - 1].id}`
        : `${'<< ' + days[index - 1].id}`;
    this.next =
      index === 8 ? `${days[0].id + ' >>'}` : `${days[index + 1].id + ' >>'}`;
  }

  onNext() {
    const tabToSelect = this.selectedIndex === 8 ? 0 : this.selectedIndex + 1;
    this.daysService.setSelectedDay(tabToSelect);
  }

  onPrevious() {
    const tabToSelect = this.selectedIndex === 0 ? 8 : this.selectedIndex - 1;
    this.daysService.setSelectedDay(tabToSelect);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
