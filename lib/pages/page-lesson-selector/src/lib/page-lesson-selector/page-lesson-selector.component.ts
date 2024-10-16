import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { links } from '@org/page-common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-lesson-selector.component.html',
  styleUrl: './page-lesson-selector.component.css',
})
export class PageLessonSelectorComponent {
  protected readonly links = links;
}
