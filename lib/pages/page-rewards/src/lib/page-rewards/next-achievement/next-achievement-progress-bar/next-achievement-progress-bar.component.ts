import { Component, computed, input } from '@angular/core';
import { UiProgressBarComponent } from '@org/ui-progress';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

@Component({
  selector: 'page-rewards-next-achievement-progress-bar',
  standalone: true,
  imports: [UiProgressBarComponent, FastSvgComponent],
  template: `
    <ui-progress-bar
      class="page-rewards-next-achievement-progress-bar__progress body-small"
      [current]="current()"
      [max]="max()"
    />
    <span
      class="page-rewards-next-achievement-progress-bar__progress-numbers body-extra-small"
    >
      <fast-svg name="banknote" />{{ coins() }} /
      {{ nextPrizeRequiredPoints() }}
    </span>
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
export class PageRewardsNextAchievementProgressBarComponent {
  coins = input.required<number>();
  highestReward = input.required<number>();
  nextPrizeRequiredPoints = input.required<number>();

  current = computed(() => this.coins() - this.highestReward());
  max = computed(() => this.nextPrizeRequiredPoints() - this.highestReward());
}
