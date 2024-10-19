import { filter, Observable, startWith, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events$ = new Subject<Event<any>>();

  on<T>(event: typeof Event<T>): Observable<Event<T> | null> {
    return this.events$.pipe(
      filter(e => e.name === event.name),
      startWith(null),
    );
  }

  emit<T>(event: Event<T>): void {
    this.events$.next(event);
  }
}

export abstract class Event<T> {
  public readonly name: string = this.constructor.name;

  protected constructor(public readonly payload: T) {}
}
