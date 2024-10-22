import { Pipe, PipeTransform } from '@angular/core';
import { ReadManyPrizesResult } from '@org/contract-prize';
import { UiTodoItem } from '@org/ui-todo-item';

@Pipe({
  standalone: true,
  pure: true,
  name: 'mapPrizeItemToUi'
})
export class PrizeItemToUiTodoItemMapperPipe implements PipeTransform {
  transform(value: ReadManyPrizesResult['content'][number]): UiTodoItem {
    return {
      id: value.id,
      detailsUrl: '',
      title: value.name,
      isComplete: value.isAchieved
    }
  }
}