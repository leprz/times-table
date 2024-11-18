import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import {
  FeaturePrizeDeleteComponent,
  FeaturePrizeEditComponent,
  FeaturePrizeFormComponent,
  FeaturePrizeListComponent,
} from '@org/feature-prize';
import { PrizeItemToUiTodoItemMapperPipe } from '../prize-item-to-ui-todo-item.mapper.pipe';
import { UiInputInlineEditableComponent } from '@org/ui-form-input';
import { UiTodoItemComponent } from '@org/ui-todo-item';
import { OnInitComponent } from '../../on-init/on-init.component';

@Component({
  standalone: true,
  selector: 'page-common-prize-list',
  templateUrl: './page-common-prize-list.component.html',
  imports: [
    AsyncPipe,
    FastSvgComponent,
    FeaturePrizeDeleteComponent,
    FeaturePrizeListComponent,
    OnInitComponent,
    PrizeItemToUiTodoItemMapperPipe,
    UiInputInlineEditableComponent,
    UiTodoItemComponent,
    FeaturePrizeFormComponent,
    FeaturePrizeEditComponent,
  ],
  styleUrls: ['./page-common-prize-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCommonPrizeListComponent {}
