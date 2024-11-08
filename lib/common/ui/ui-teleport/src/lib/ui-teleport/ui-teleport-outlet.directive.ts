import { ChangeDetectorRef, Directive, effect, input, OnDestroy, ViewContainerRef } from '@angular/core';
import { UiTeleportService } from './ui-teleport.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Directive({
  selector: '[uiTeleportOutlet]',
  standalone: true
})
export class UiTeleportOutletDirective implements OnDestroy {
  uiTeleportOutlet = input.required<string>();

  constructor(
    private readonly teleportService: UiTeleportService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly viewContainerRef?: ViewContainerRef
  ) {
    this.initTeleportationActiveSub();
    effect(() => {
      this.registerTeleportOutlet();
    });
  }

  private registerTeleportOutlet(): void {
    if (
      this.viewContainerRef &&
      this.uiTeleportOutlet()
    ) {
      this.teleportService.registerPortalOutlet(
        this.uiTeleportOutlet(),
        this.viewContainerRef
      );
    }
  }

  private initTeleportationActiveSub(): void {
    toObservable(this.uiTeleportOutlet).pipe(
      switchMap(
        (uiTeleportOutlet) =>
          this.teleportService.isTeleportationActive$(uiTeleportOutlet ?? null)
      ),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.uiTeleportOutlet()) {
      this.teleportService.unregisterPortalOutlet(this.uiTeleportOutlet());
    }
  }
}
