import { filter, Observable, startWith, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageBus {
  isDebug = false;
  onlyTrackNewEvents = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events$ = new Subject<Event<any>>();

  private trace<T>(eventName: string, explain?: string, e?: Event<T>): void {
    if (this.isDebug) {
      console.groupCollapsed(['on', eventName, explain].filter(v => v !== undefined).join(':'));
      console.trace(e?.payload);
      console.groupEnd();
    }
  }

  on<T>(event: typeof Event<T>, action?: string): Observable<Event<T> | null> {
    if (!this.onlyTrackNewEvents) {
      this.trace(event.name, action);
    }
    return this.events$.pipe(
      filter(e => e.name === event.name),
      tap(e => this.trace(event.name, action, e)),
      startWith(null),
    );
  }

  emit<T>(event: Event<T>): void {
    this.events$.next(event);
  }
}

export abstract class Event<T> {
  public readonly name: string = this.constructor.name;

  constructor(public readonly payload: T) {}
}
