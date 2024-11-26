export class SoundCache {
  sounds = new Map<string, HTMLAudioElement>();

  getOrCreate(src: string): HTMLAudioElement {
    let audio = this.sounds.get(src);
    if (!audio) {
      audio = new Audio(src);
      this.sounds.set(src, audio);
    }
    return audio;
  }
}
