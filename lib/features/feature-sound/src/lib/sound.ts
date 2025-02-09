import { SoundCache } from './sound-cache';

export class Sound {
  private static playbackAudio: HTMLAudioElement | null = null;
  private audio: HTMLAudioElement;
  private static readonly soundCache = new SoundCache();

  constructor(private src: string) {
    this.audio = this.createAudio();
  }

  static _muted = false;

  static get muted(): boolean {
    return Sound._muted;
  }

  static mute(): void {
    Sound._muted = true;
    if (Sound.playbackAudio) {
      Sound.playbackAudio.muted = true;
    }
  }

  static unmute(): void {
    Sound._muted = false;
    if (Sound.playbackAudio) {
      Sound.playbackAudio.muted = false;
    }
  }

  private static isTheSameSound(audio: HTMLAudioElement, src: string): boolean {
    return audio.src.slice(-src.length) === src;
  }

  private static isPlaying(audio: HTMLAudioElement): boolean {
    return (
      audio.currentTime > 0 &&
      !audio.paused &&
      !audio.ended &&
      audio.readyState > 2
    );
  }

  preload(): void {
    if (!Sound._muted) {
      this.audio = Sound.soundCache.getOrCreate(this.src);
    }
  }

  async play(): Promise<void> {
    if (Sound._muted) {
      return;
    }

    if (this.audio.src === '') {
      this.preload();
    }

    if (Sound.playbackAudio) {
      if (Sound.isTheSameSound(Sound.playbackAudio, this.src)) {
        if (Sound.isPlaying(Sound.playbackAudio)) {
          return;
        } else {
          this.rewindSound();
        }
      } else {
        Sound.playbackAudio = this.audio;
      }
    } else {
      Sound.playbackAudio = this.audio;
    }

    Sound.playbackAudio?.play();
  }

  pause(): void {
    if (Sound.playbackAudio) {
      Sound.playbackAudio.pause();
    }
  }

  destroy(): void {
    this.pause();
    this.rewindSound();
    this.audio.removeEventListener('ended', this.rewindSound);
    if (Sound.playbackAudio) {
      Sound.playbackAudio = null;
    }
  }

  private createAudio(): HTMLAudioElement {
    if (Sound._muted) {
      return new Audio();
    }
    return Sound.soundCache.getOrCreate(this.src);
  }

  private rewindSound(): void {
    if (Sound.playbackAudio) {
      Sound.playbackAudio.currentTime = 0;
    }
  }

  onSoundEnded(callback: () => void) {
    if (Sound.muted) {
      callback();
      return;
    }
    const handler = () => {
      callback();
      this.audio.removeEventListener('ended', handler);
    };
    this.audio.addEventListener('ended', handler);
  }
}
