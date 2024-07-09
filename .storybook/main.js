module.exports = {
  'stories': [ '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
  
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-measure',
    '@storybook/addon-actions',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
  ],
  
  'framework': {
    name: '@storybook/react-webpack5',
    options: {},
  },
  
  staticDirs: [ '../public' ],
  
  docs: {},
  
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
