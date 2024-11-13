import {
  Directive,
  effect,
  input,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { UiTeleportService } from './ui-teleport.service';

@Directive({
  selector: '[uiTeleportTo]',
  standalone: true,
})
export class UiTeleportToDirective implements OnDestroy {
  uiTeleportTo = input.required<string>();

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly teleportService: UiTeleportService,
  ) {
    effect(() => {
      this.startTeleportation();
    });
  }

  ngOnDestroy(): void {
    this.finishTeleportation();
  }

  private startTeleportation(): void {
    if (this.uiTeleportTo()) {
      this.teleportService.startTeleportation(
        this.uiTeleportTo(),
        this.templateRef,
      );
    }
  }

  private finishTeleportation(): void {
    if (this.uiTeleportTo()) {
      this.teleportService.finishTeleportation(this.uiTeleportTo());
    }
  }
}
