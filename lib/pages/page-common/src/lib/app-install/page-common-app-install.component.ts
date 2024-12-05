import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PopoverComponent } from '@org/ui-popover';
import { FeatureInstallComponent } from '@org/feature-install';
import { slideDownWhenTrue, slideUpWhenTrue } from '@org/ui-animation';
import { FeatureTimerComponent } from '@org/feature-times-table';

@Component({
  selector: 'page-common-app-install',
  standalone: true,
  imports: [PopoverComponent, FeatureInstallComponent, FeatureTimerComponent],
  template: `
    <feature-install
      (appNotInstalled)="timer.start()"
      (appInstalled)="popover.close()"
      (appInstallationDismissed)="popoverHideTrigger.set(true)"
      #featureInstall
    />
    <feature-timer
      [timer]="1"
      [startOnLoad]="false"
      #timer
      (timesUp)="popover.open()"
    />
    <ui-popover
      #popover
      class="page-common-app-install"
      [@slideUpWhenTrue]="popover.isOpen()"
      [@slideDownWhenTrue]="popoverHideTrigger()"
      (@slideDownWhenTrue.done)="popover.close()"
    >
      <div class="page-common-app-install__body">
        <button
          (click)="featureInstall.dismissInstallation()"
          class="btn-secondary"
        >
          ×
        </button>
        <p i18n>Install this app for a better experience!</p>
        <button (click)="featureInstall.install()" i18n>Install</button>
      </div>
    </ui-popover>
  `,
  styleUrls: ['./page-common-app-install.component.css'],
  animations: [slideDownWhenTrue, slideUpWhenTrue],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCommonAppInstallComponent {
  popoverHideTrigger = signal(false);
}
