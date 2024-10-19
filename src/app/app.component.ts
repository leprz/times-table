import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdateService } from './service-worker-updater';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
  standalone: true,
  imports: [RouterModule, TopBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
        if(confirm('Nowa wersja aplikacji jest dostępna. Czy chcesz ją zainstalować?')) {
          this.updateService.refreshApp();
        }
      });
  }
}
