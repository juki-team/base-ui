module.exports = {
  'stories': [ '../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-measure',
    '@storybook/addon-actions',
    '@storybook/addon-themes',
  ],
  'framework': {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};