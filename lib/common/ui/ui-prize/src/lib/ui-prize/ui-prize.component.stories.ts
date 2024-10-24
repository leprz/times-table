import type { Meta, StoryObj } from '@storybook/angular';
import { UiPrizeComponent } from './ui-prize.component';

const meta: Meta<UiPrizeComponent> = {
  component: UiPrizeComponent,
  title: 'UiPrizeComponent',
};
export default meta;
type Story = StoryObj<UiPrizeComponent>;

export const Primary: Story = {
  args: {},
};
