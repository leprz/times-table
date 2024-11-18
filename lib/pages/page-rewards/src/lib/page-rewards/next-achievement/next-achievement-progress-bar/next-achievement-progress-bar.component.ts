import { Component, input, signal } from '@angular/core';
import { UiProgressBarComponent } from '@org/ui-progress';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { RewardProgress, RewardProgressPresenter } from '@org/feature-rewards';

@Component({
  selector: 'page-rewards-next-achievement-progress-bar',
  standalone: true,
  imports: [UiProgressBarComponent, FastSvgComponent],
  template: `
    @if (progress() !== null) {
      <ui-progress-bar
        class="page-rewards-next-achievement-progress-bar__progress body-small"
        [current]="progress()?.actual ?? 0"
        [max]="progress()?.target ?? 0"
      />
      <span
        class="page-rewards-next-achievement-progress-bar__progress-numbers body-extra-small"
      >
        <fast-svg name="banknote" />
        {{ coins() }} /
        {{ nextPrizeRequiredPoints() }}
      </span>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
    `
      .page-rewards-next-achievement-progress-bar__progress-numbers {
        margin-top: 0.2em;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        fast-svg {
          font-size: 0.6em;
        }
      }
    `,
  ],
})
export class PageRewardsNextAchievementProgressBarComponent
  implements RewardProgressPresenter
{
  readonly progress = signal<RewardProgress | null>(null);
  readonly coins = input<number>(0);
  readonly nextPrizeRequiredPoints = input<number | null>(null);
  presentRewardProgress(progress: RewardProgress): void {
    this.progress.set(progress);
  }
}
