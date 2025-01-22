import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiAnimationFileComponent } from '@org/ui-animation';
import { OnInitComponent, RouteManagerComponent } from '@org/page-common';
import { FeatureSoundComponent } from '@org/feature-sound';

@Component({
  selector: 'lib-page-learn-summary',
  imports: [
    CommonModule,
    UiAnimationFileComponent,
    OnInitComponent,
    RouteManagerComponent,
    FeatureSoundComponent,
  ],
  templateUrl: './page-learn-summary.component.html',
  styleUrl: './page-learn-summary.component.css',
})
export class PageLearnSummaryComponent {}
