import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdateService } from './service-worker-updater';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageCommonLayoutModeComponent, PageCommonTopBarComponent } from '@org/page-common';
import { UiFormErrorsComponent } from '@org/ui-form-errors';

@Component({
  standalone: true,
  imports: [RouterModule, PageCommonTopBarComponent, UiFormErrorsComponent, PageCommonLayoutModeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private readonly updateService: UpdateService) {
    this.updateService.checkForUpdate().then((hasUpdate) => {
      if (hasUpdate) {
        console.log('New version available');
      }
    });

    this.updateService.onNewVersionAvailable$
      .pipe(takeUntilDestroyed()).subscribe(() => {
        if(confirm($localize`New version available. Load New Version?`)) {
          this.updateService.refreshApp();
        }
      });
  }
}
