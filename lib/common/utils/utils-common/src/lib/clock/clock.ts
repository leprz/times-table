import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Clock {
  now(): Date {
    return new Date();
  }

  today(): Date {
    const date = this.now();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  tomorrow() {
    const date = this.today();
    date.setDate(date.getDate() + 1);
    return date;
  }
}
