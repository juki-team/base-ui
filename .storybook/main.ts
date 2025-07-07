import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

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
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
        },
      ],
    });
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        require.resolve('sass-loader'),
      ],
    });
    config.module.rules.push({
      test: /\.(woff(2)?|ttf|eot|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name][ext][query]',
      },
    });
    
    config.resolve = config.resolve || {};
    config.resolve.extensions = config.resolve.extensions || [];
    config.resolve.extensions.push('.ts', '.tsx');
    
    config.resolve.alias = config.resolve.alias || {};
    (config.resolve.alias as Record<string, string>)['@juki-team/base-ui/assets'] = path.resolve(__dirname, '../dist/assets'),
      
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      };
    return config;
  },
};

export default config;
