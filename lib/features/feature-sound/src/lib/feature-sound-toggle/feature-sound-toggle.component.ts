import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Sound } from '../sound';
import { MessageBus } from '@org/message-bus';
import { SoundMutedEvent } from '../common/sound-muted.event';
import { SoundUnMutedEvent } from '../common/sound-unmuted.event';
import { SoundSettingsService } from './sound-settings.service';

@Component({
  selector: 'feature-sound-toggle',
  standalone: true,
  template: ` <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSoundToggleComponent {
  readonly isMuted = signal(false);
  private readonly messageBus = inject(MessageBus);
  private readonly soundSettings = inject(SoundSettingsService);

  constructor() {
    if (this.soundSettings.getSoundSettings().isMuted) {
      this.mute();
    } else {
      this.unmute();
    }

    effect(() => {
      this.soundSettings.setSoundSettings({ isMuted: this.isMuted() });
    });
  }
  mute(): void {
    Sound.mute();
    this.isMuted.set(Sound.muted);
    this.messageBus.emit(new SoundMutedEvent());
  }

  unmute(): void {
    Sound.unmute();
    this.isMuted.set(Sound.muted);
    this.messageBus.emit(new SoundUnMutedEvent());
  }

  toggleMute(): void {
    Sound.muted ? this.unmute() : this.mute();
  }
}
