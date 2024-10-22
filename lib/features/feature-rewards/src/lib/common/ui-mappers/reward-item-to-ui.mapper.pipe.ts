import { Pipe, PipeTransform } from '@angular/core';
import { RewardResponseItem } from '@org/contract-rewards';
import { UiRewardItem } from '@org/ui-reward';
@Pipe({
  standalone: true,
  name: 'mapRewardItemToUi'
})
export class RewardItemToUiMapperPipe implements PipeTransform {
  transform(value: RewardResponseItem): UiRewardItem {
    return {
      name: value.name,
      requiredPoints: value.requiredPoints,
      achievedAt: value.achievedAt ? new Date(value.achievedAt) : null,
      isCollected: value.collectedAt !== undefined
    }
  }
}