import { Component, inject, Injectable, output, signal } from '@angular/core';
import { MessageBus } from '@org/message-bus';
import { PageCommonLayoutModeChangedEvent } from '../events/page-common-layout-mode-changed.event';
import { filterNill } from '@org/utils-data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface WithLayoutMode {
  onLayoutModeChange(mode: LayoutMode): void;
}

export type LayoutMode = 'normal' | 'distraction-free';

@Injectable({
  providedIn: 'root',
})
export class LayoutModeService {
  private readonly messageBus = inject(MessageBus);
  applyMode(mode: LayoutMode): void {
    this.messageBus.emit(new PageCommonLayoutModeChangedEvent({ layoutMode: mode }));
  }
}

@Component({
  standalone: true,
  selector: 'page-common-layout-mode',
  template: `<ng-content></ng-content>`,
})
export class PageCommonLayoutModeComponent {
  private mode = signal<LayoutMode>('normal');
  private readonly messageBus = inject(MessageBus);
  layoutModeChanged = output();

  constructor() {
    this.messageBus.on(PageCommonLayoutModeChangedEvent, 'apply layout mode')
      .pipe(
        filterNill(),
        takeUntilDestroyed()
      )
      .subscribe((event) => {
      this.setMode(event.payload.layoutMode);
    });
  }

  setMode(mode: LayoutMode): void {
    this.mode.set(mode);
    this.layoutModeChanged.emit();
  }

  applyModeTo(component: WithLayoutMode): void {
    component.onLayoutModeChange(this.mode());
  }
}