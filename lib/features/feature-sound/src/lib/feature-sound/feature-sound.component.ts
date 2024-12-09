import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sound } from '../sound';
import { MessageBus } from '@org/message-bus';
import { SoundUnMutedEvent } from '../common/sound-unmuted.event';
import { filterNill } from '@org/utils-data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type sounds = 'correct' | 'incorrect';

@Component({
  selector: 'feature-sound',
  imports: [CommonModule],
  template: '',
})
export class FeatureSoundComponent implements OnInit, OnDestroy {
  private readonly messageBus = inject(MessageBus);

  readonly name = input.required<sounds>();
  readonly preload = input(false);

  readonly afterSoundStarted = output<void>(); // file already loaded and playing
  readonly beforeSoundStarted = output<void>(); // file not loaded yet when it's not preloaded

  private readonly sound = computed(
    () => new Sound(`assets/sounds/${this.name()}.mp3`),
  );

  constructor() {
    this.messageBus
      .on(SoundUnMutedEvent, 'preload sound')
      .pipe(filterNill(), takeUntilDestroyed())
      .subscribe(() => {
        this.preloadIfEnabled();
      });
  }

  ngOnInit(): void {
    this.preloadIfEnabled();
  }

  private preloadIfEnabled(): void {
    if (this.preload()) {
      this.sound().preload();
    }
  }

  ngOnDestroy() {
    this.sound().destroy();
  }

  async playSound() {
    this.beforeSoundStarted.emit();
    await this.sound().play();
    this.afterSoundStarted.emit();
  }
}
