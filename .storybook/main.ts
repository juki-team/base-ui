import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

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
  stories: [ '../src/**/*.stories.tsx' ],
  
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    // '@chromatic-com/storybook',
    '@storybook/addon-docs',
    // '@storybook/preset-scss',
  ],
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  
  staticDirs: [ '../public' ],
  
  docs: {},
  
  typescript: {
    // reactDocgen: 'react-docgen-typescript',
  },
  
  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: require.resolve('babel-loader'),
    //     },
    //   ],
    // });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('swc-loader'),
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      ],
    });
    
    // config.module.rules.push({
    //   test: /\.module\.s[ac]ss$/i,
    //   use: [
    //     require.resolve('style-loader'),
    //     {
    //       loader: require.resolve('css-loader'),
    //       options: {
    //         modules: true,
    //       },
    //     },
    //     require.resolve('sass-loader'),
    //   ],
    //   // include: path.resolve(__dirname, '../src'),
    // });
    // config.module!.rules = (config.module!.rules || []).filter((rule) => {
    //   const test = rule?.test?.toString() || '';
    //   return !test.includes('scss') && !test.includes('sass');
    // });
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      // exclude: /\.module\.s[ac]ss$/i,
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
    // config.resolve.extensions = config.resolve.extensions || [];
    // config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin(),
    ];
    config.resolve.alias = (config.resolve.alias || {}) as Record<string, string>;
    config.resolve.alias['@juki-team/base-ui/assets'] = path.resolve(__dirname, '../dist/assets');
    config.resolve.alias['@juki-team/base-ui/assets'] = path.resolve(__dirname, '../dist/assets');
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default config;
