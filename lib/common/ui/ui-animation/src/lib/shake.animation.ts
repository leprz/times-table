import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const shakeAnimation = animation([
  animate(
    '0.5s',
    keyframes([
      style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
      style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
      style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
      style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
      style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
      style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
      style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
      style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
      style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
      style({ transform: 'translate3d(0, 0, 0)', offset: 1.0 }),
    ]),
  ),
]);
export const shakeOnEnter = trigger('shakeOnEnter', [
  transition(':enter', [useAnimation(shakeAnimation)]),
]);

export const shakeOnBooleanChange = trigger('shake', [
  transition('* => true', [useAnimation(shakeAnimation)]),
]);
