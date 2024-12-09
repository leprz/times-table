import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import QrCreator from 'qr-creator';

@Component({
  selector: 'page-common-share-app',
  template: `
    <h2 class="body-small" i18n>Boost Math Skills Together - Tell a friend!</h2>
    <span #qrCode class="page-common-share-app__qr"></span>
    <span class="surface page-common-share-app__link body-extra-small">
      <input
        type="text"
        readonly
        [value]="appLink()"
        #linkInput
        (click)="linkInput.select()"
      />
    </span>
  `,
  styles: [
    `
      page-common-share-app {
        color: var(--color-primary);
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 3rem;
        align-items: center;
      }
    `,
    `
      h2 {
        margin-bottom: 0;
        max-width: 30rem;
      }
    `,
    `
      canvas {
        max-height: 50svh;
      }
    `,
    `
      .page-common-share-app__qr {
        background-color: var(--color-primary);
        padding: 0.7rem;
        border-radius: 1rem;
      }
    `,
    `
      .page-common-share-app__link {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
    `,
    `
      input {
        flex: 1;
        width: 100%;
        min-width: 0;
        text-align: center;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ShareAppComponent {
  private readonly qrCodeOutlet =
    viewChild<ElementRef<HTMLDivElement>>('qrCode');
  readonly appLink = signal(window.location.origin);
  constructor() {
    effect(() => {
      const qrCodeOutlet = this.qrCodeOutlet();
      if (!qrCodeOutlet) {
        return;
      }
      QrCreator.render(
        {
          text: window.location.origin,
          radius: 0.5, // 0.0 to 0.5
          ecLevel: 'M', // L, M, Q, H
          fill: '#fff',
          size: 250, // in pixels,
        },
        qrCodeOutlet.nativeElement,
      );
    });
  }
}
