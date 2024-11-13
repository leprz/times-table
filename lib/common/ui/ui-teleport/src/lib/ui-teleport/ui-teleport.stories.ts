import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { UiTeleportToDirective } from './ui-teleport-to.directive';
import { UiTeleportOutletDirective } from './ui-teleport-outlet.directive';

export default {
  title: 'Teleport',
  decorators: [
    moduleMetadata({
      imports: [UiTeleportToDirective, UiTeleportOutletDirective],
    }),
  ],
} as Meta;

export const Teleport: StoryObj = {
  render: () => ({
    template: `
      <h2>Portal outlet</h2>
      <div  style="border: 1px dotted #000; display: inline-block; padding: 20px">
          <ng-container uiTeleportOutlet="portalKey"></ng-container>
      </div>
      <br />
      <br />
      <h2>Content to be teleported:</h2>
      <div style="border: 1px dotted #000; display: inline-block; padding: 20px">
        <div *uiTeleportTo="'portalKey'">
             <p>I've been teleported!</p>
        </div>
      </div>
    `,
  }),
};
