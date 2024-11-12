import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filterNill } from '@org/utils-data-service';
import { combineLatestWith, filter, map, tap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'page-common-route-manager',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteManagerComponent {
  readonly observeFragment = input<string>();

  readonly fragmentEnabled = output<void>();
  readonly activeUrlChanged = output<void>();

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);

  readonly activeUrl = toSignal(this.router.events.pipe(
    filter((e) => e.type === EventType.NavigationEnd),
    map(() => this.location.path()),
  ));

  constructor() {
    toObservable(this.activeUrl).pipe(
      filterNill(),
      tap(() => this.activeUrlChanged.emit()),
      takeUntilDestroyed(),
    ).subscribe();

    this.activatedRoute.fragment.pipe(
      filterNill(),
      combineLatestWith(toObservable(this.observeFragment)),
      filter(([fragment, filter]) => (filter ? fragment === filter : true)),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.fragmentEnabled.emit();
    });
  }

  async removeFragments(): Promise<void> {
    await this.router.navigate([this.activeUrl()], {
      fragment: undefined,
      replaceUrl: true,
    });
  }
}