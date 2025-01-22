import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  links,
  PageCommonLayoutModeComponent,
  PageCommonTopBarComponent,
} from '@org/page-common';

@Component({
  imports: [
    RouterModule,
    PageCommonLayoutModeComponent,
    PageCommonTopBarComponent,
  ],
  selector: 'tiny-learners-app-root',
  templateUrl: './tiny-learners-app.component.html',
  styleUrl: './tiny-learners-app.component.scss',
})
export class TinyLearnersAppComponent {
  protected readonly links = links;
}
