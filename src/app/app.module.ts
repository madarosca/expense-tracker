import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import localeRoExtra from '@angular/common/locales/extra/ro';

import { AppComponent } from './app.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseFormComponent } from './expenses/expense-form/expense-form.component';
import { ExpenseDetailComponent } from './expenses/expense-detail/expense-detail.component';
import { ExpensesSummaryComponent } from './expenses/expenses-summary/expenses-summary.component';
import { HomeComponent } from './main/main.component';
import { CustomCurrencyPipe } from './shared/custom-currency.pipe';
import { HeaderComponent } from './layout/header/header.component';
import { BudgetComponent } from './budget/budget.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    ExpenseFormComponent,
    ExpenseDetailComponent,
    ExpensesSummaryComponent,
    HomeComponent,
    CustomCurrencyPipe,
    HeaderComponent,
    BudgetComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [BrowserModule, FormsModule, TableModule, ChartModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ro-RO', // navigator.language
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeRo, 'ro-RO', localeRoExtra);
  }
}
