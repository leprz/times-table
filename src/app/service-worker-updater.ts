import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UpdateService {

  readonly onNewVersionAvailable$ = this.swUpdate.versionUpdates
    .pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
    );

  constructor(private readonly swUpdate: SwUpdate) {
  }

  refreshApp(): void {
    document.location.reload();
  }

  checkForUpdate(): Promise<boolean> {
    if (this.swUpdate.isEnabled) {
      return this.swUpdate.checkForUpdate();
    }

    return Promise.resolve(false);
  }
}