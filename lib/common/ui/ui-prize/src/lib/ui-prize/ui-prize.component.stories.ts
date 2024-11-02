import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { UiPrizeComponent } from './ui-prize.component';
import { provideFastSVG } from '@push-based/ngx-fast-svg';

const meta: Meta<UiPrizeComponent> = {
  component: UiPrizeComponent,
  title: 'UiPrizeComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideFastSVG({
          url: (name: string) => `assets/icons-svg/${name}.svg`,
          defaultSize: '1.5em'
        })
      ]
    })
  ]
};
export default meta;
type Story = StoryObj<UiPrizeComponent>;

export const Primary: Story = {
  args: {
    prize: {
      requiredPoints: 1000,
      prizeName: 'Trip to the Moon',
    }
  },
};
