import { Pipe, PipeTransform, LOCALE_ID } from '@angular/core';
import {
  formatCurrency,
  getCurrencySymbol,
  getLocaleCurrencyCode,
} from '@angular/common';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = getLocaleCurrencyCode('ro-RO'),
    _display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo: string = '1.0',
    locale: string = 'ro-RO'
  ): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      digitsInfo
    );
  }
}
