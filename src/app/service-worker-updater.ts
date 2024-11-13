import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface Migration {
  migrate(): Promise<void>;
}

@Injectable({ providedIn: 'root' })
export class UpdateService {
  private readonly migrations = {
    highScore: {
      date: new Date('2024-11-09T08:21:13.925Z'),
      import: () =>
        import('./migrations/migration-high-score').then(
          (m) => m.MigrationHighScore,
        ),
    },
  };

  readonly onNewVersionAvailable$ = this.swUpdate.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    takeUntilDestroyed(),
  );

  constructor(private readonly swUpdate: SwUpdate) {
    if (
      localStorage.getItem('lastMigrationDate') ||
      localStorage.getItem('scheduledMigrations')
    ) {
      this.runMigrations();
    } else {
      // this means we are running migrations for the first time
      this.scheduleMigrations();
      this.refreshApp();
    }
  }

  refreshApp(): void {
    this.scheduleMigrations();
    document.location.reload();
  }

  scheduleMigrations(): void {
    const lastMigrationDate = localStorage.getItem('lastMigrationDate');
    const lastMigration = lastMigrationDate
      ? new Date(lastMigrationDate)
      : null;
    const migrationKeysToSchedule = Object.entries(this.migrations)
      .filter(
        ([, migration]) => !lastMigration || migration.date > lastMigration,
      )
      .map(([key]) => key);
    localStorage.setItem(
      'scheduledMigrations',
      JSON.stringify(migrationKeysToSchedule),
    );
  }

  runMigrations(): void {
    const scheduledMigrations = JSON.parse(
      localStorage.getItem('scheduledMigrations') ?? '[]',
    ) as (keyof typeof this.migrations)[];
    scheduledMigrations.forEach(async (migrationKey) => {
      const migration = this.migrations[migrationKey];
      if (!migration) {
        return;
      }
      const Migration = await migration.import();
      const migrationInstance = new Migration();
      await migrationInstance.migrate();
      localStorage.setItem('lastMigrationDate', new Date().toISOString());
    });
    localStorage.removeItem('scheduledMigrations');
  }

  checkForUpdate(): Promise<boolean> {
    if (this.swUpdate.isEnabled) {
      return this.swUpdate.checkForUpdate();
    }

    return Promise.resolve(false);
  }
}
