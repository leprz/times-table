import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { tinyLearnersAppRoutes } from './tiny-learners-app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import '@angular/localize/init';
import { provideLottieOptions } from 'ngx-lottie';

export const tinyLearnersAppConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(tinyLearnersAppRoutes, withViewTransitions()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFastSVG({
      url: (name: string) => `assets/icons-svg/${name}.svg`,
      defaultSize: '1.5em',
    }),
    provideAnimationsAsync(),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ],
};
