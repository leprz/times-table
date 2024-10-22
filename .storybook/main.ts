import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../lib/common/ui/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  staticDirs: ['../public'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-angular-router',
  ],

  framework: {
    name: '@storybook/angular',
    options: {
    },
  },

  docs: {}
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
