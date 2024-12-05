import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const slideDownAnimation = animation([
  animate(
    '0.3s ease-out',
    style({ transform: 'translateY(100%)', opacity: 1 }),
  ),
]);

const slideUpAnimation = animation([
  style({ transform: 'translateY(100%)', opacity: 0 }),
  animate('0.3s ease-in', style({ transform: 'translateY(0)', opacity: 1 })),
]);

export const slideDownOnEnter = trigger('slideDownOnEnter', [
  transition(':enter', [useAnimation(slideDownAnimation)]),
]);

export const slideDownWhenTrue = trigger('slideDownWhenTrue', [
  transition('false => true', [useAnimation(slideDownAnimation)]),
]);

export const slideUpWhenTrue = trigger('slideUpWhenTrue', [
  transition('false => true', [useAnimation(slideUpAnimation)]),
]);

export const slideUpOnLeave = trigger('slideUpOnLeave', [
  transition(':leave', [useAnimation(slideUpAnimation)]),
]);
