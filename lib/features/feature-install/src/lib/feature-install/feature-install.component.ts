import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '@org/local-storage';
import { Clock } from '@org/utils-common';
import { fromEvent, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type BeforeInstallPromptEvent = {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

@Component({
  selector: 'feature-install',
  imports: [CommonModule],
  template: '',
})
export class FeatureInstallComponent {
  private readonly INSTALLATION_DISMISSED_UNTIL_KEY =
    'app-installation-dismissed-until';
  readonly localStorageService = inject(LocalStorageService);
  readonly clock = inject(Clock);
  readonly appNotInstalled = output<void>();
  readonly appInstalled = output<void>();
  readonly isAppInstallationNeeded = signal<boolean | null>(null);
  readonly appInstallationDismissed = output<void>();
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  beforeinstallprompt$ = fromEvent(window, 'beforeinstallprompt');

  constructor() {
    this.beforeinstallprompt$
      .pipe(takeUntilDestroyed(), tap(console.log))
      .subscribe((event) => this.initializePrompt(event));
  }

  private initializePrompt(event: Event): void {
    // Prevent the default mini-infobar from appearing
    event.preventDefault();
    this.deferredPrompt = event as unknown as BeforeInstallPromptEvent;
    if (!this.isInstallationDismissed()) {
      this.appNotInstalled.emit();
      this.isAppInstallationNeeded.set(true);
    }
  }

  private isInstallationDismissed(): boolean {
    const dismissedUntil = this.localStorageService.getItem(
      this.INSTALLATION_DISMISSED_UNTIL_KEY,
    );
    return !!dismissedUntil && this.clock.now() < new Date(dismissedUntil);
  }

  dismissInstallation(): void {
    this.localStorageService.setItem(
      this.INSTALLATION_DISMISSED_UNTIL_KEY,
      this.clock.tomorrow().toISOString(),
    );
    this.appInstallationDismissed.emit();
    this.isAppInstallationNeeded.set(false);
  }

  async install(): Promise<void> {
    if (!this.deferredPrompt) return;
    await this.deferredPrompt.prompt();

    // Wait for the user's response
    const choiceResult = await this.deferredPrompt.userChoice;

    // Reset the deferred prompt
    this.deferredPrompt = null;

    if (choiceResult.outcome === 'dismissed') {
      this.dismissInstallation();
      return;
    } else {
      this.localStorageService.removeItem(
        this.INSTALLATION_DISMISSED_UNTIL_KEY,
      );
      this.appInstalled.emit();
      this.isAppInstallationNeeded.set(false);
      return;
    }
  }
}
