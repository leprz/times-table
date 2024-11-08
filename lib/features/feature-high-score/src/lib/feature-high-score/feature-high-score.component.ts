import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighScoreService } from '@org/feature-times-table';
import { MessageBus } from '@org/message-bus';
import { HighScoreCalculatedEvent } from '@org/common-events';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { filterNill } from '@org/utils-data-service';

@Component({
  selector: 'feature-high-score',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureHighScoreComponent {
  readonly key = input<string>();

  readonly highScore = computed(
    () => {
      return this.newHighScore() ?? this.localStorageService.getHighScore(this.key() ?? undefined);
    }
  );

  readonly newHighScore = signal<number | null>(null);

  private readonly localStorageService = inject(HighScoreService);
  protected readonly messageBusService = inject(MessageBus);

  constructor() {
    toObservable(this.key).pipe(
      switchMap((key) =>
        this.messageBusService.on(HighScoreCalculatedEvent, 'update high score in ui component').pipe(
          filterNill(),
          filter((event) => event.payload.exerciseKey === key)
        )
      ),
      filterNill(),
      takeUntilDestroyed()
    ).subscribe((event) => {
      this.newHighScore.set(this.localStorageService.getHighScore(event.payload.exerciseKey));
    });
  }
}
