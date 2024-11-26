import type { Meta, StoryObj } from '@storybook/angular';
import { UiOperationComponent } from './ui-operation.component';

const meta: Meta<UiOperationComponent> = {
  component: UiOperationComponent,
  title: 'ui-operation/Ui Operation Component',
};
export default meta;
type Story = StoryObj<UiOperationComponent>;

export const Primary: Story = {
  args: {
    operation: {
      operators: [1, 2],
      operationSign: '+',
      result: 3,
    },
  },
};
