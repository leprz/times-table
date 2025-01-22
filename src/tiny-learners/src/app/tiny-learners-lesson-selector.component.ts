import { Component, inject } from '@angular/core';
import { LayoutModeService } from '@org/page-common';
import { tlLinks } from '@org/page-tl-common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tiny-learners-lesson-selector-component',
  imports: [RouterLink],
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      a {
        font-size: 2rem;
        text-align: center;
      }
    `,
  ],
  template: `
    <a
      class="btn-primary"
      [routerLink]="tlLinks.learn_numbers"
      [queryParams]="{ min: 1, max: 3 }"
      >1-3</a
    >
    <a
      class="btn-primary"
      [routerLink]="tlLinks.learn_numbers"
      [queryParams]="{ min: 4, max: 6 }"
      >4-6</a
    >
    <a
      class="btn-primary"
      [routerLink]="tlLinks.learn_numbers"
      [queryParams]="{ min: 7, max: 10 }"
      >7-10</a
    >
    <a
      class="btn-primary"
      [routerLink]="tlLinks.learn_numbers"
      [queryParams]="{ min: 1, max: 5 }"
      >1-5</a
    >
    <a
      class="btn-primary"
      [routerLink]="tlLinks.learn_numbers"
      [queryParams]="{ min: 1, max: 10 }"
      >1-10</a
    >
    <a class="btn-primary" [routerLink]="tlLinks.learn_colors">Kolory</a>
    <a class="btn-primary" [routerLink]="tlLinks.learn_numbers_painting"
      >Rysowanie</a
    >
  `,
})
export class TinyLearnersLessonSelectorComponent {
  private readonly layoutModeService = inject(LayoutModeService);

  constructor() {
    this.layoutModeService.applyMode('tiny-learners-normal');
  }

  protected readonly tlLinks = tlLinks;
}
