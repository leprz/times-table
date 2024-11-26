import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '@org/local-storage';
export interface SoundSettings {
  isMuted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SoundSettingsService {
  private readonly localStorage = inject(LocalStorageService);
  getSoundSettings(): SoundSettings {
    return {
      isMuted: this.localStorage.getItem('isMuted') === 'true',
    };
  }

  setSoundSettings(settings: SoundSettings): void {
    this.localStorage.setItem('isMuted', settings.isMuted.toString());
  }
}
