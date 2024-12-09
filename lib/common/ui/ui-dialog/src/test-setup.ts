import { TextDecoder, TextEncoder } from 'util';
import '@angular/localize/init';
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

Object.assign(global, { TextDecoder, TextEncoder });
