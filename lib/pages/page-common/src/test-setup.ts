import { TextDecoder, TextEncoder } from 'util';
import 'jest-preset-angular/setup-jest';

Object.assign(global, { TextDecoder, TextEncoder });
// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },
};
