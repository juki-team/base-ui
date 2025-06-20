import type { StorybookConfig } from '@storybook/react-webpack5';

// module.exports = {
//   stories: [ '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
//
//   addons: [
//     '@storybook/addon-links',
//     '@storybook/preset-create-react-app',
//     '@storybook/addon-themes',
//     '@chromatic-com/storybook',
//     '@storybook/addon-docs'
//   ],
//
//   framework: {
//     name: '@storybook/react-webpack5',
//     options: {},
//   },
//
//   staticDirs: [ '../public' ],
//
//   docs: {},
//
//   typescript: {
//     reactDocgen: 'react-docgen-typescript',
//   },
// };

const config: StorybookConfig = {
  stories: [ '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
  
  addons: [
    '@storybook/addon-links',
    '@storybook/preset-create-react-app',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],
  
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  
  staticDirs: [ '../public' ],
  
  docs: {},
  
  typescript: {
    // reactDocgen: 'react-docgen-typescript',
  },
  
  webpackFinal: async (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default config;
