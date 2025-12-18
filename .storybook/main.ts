import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [ '../src/**/*.stories.tsx' ],
  
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
  ],
  
  framework: '@storybook/react-vite',
  
  staticDirs: [ '../public' ],
  
  docs: {},
  
  typescript: {
    // reactDocgen: 'react-docgen-typescript',
  },
  
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      define: {
        'process.env': {
          NODE_ENV: 'development',
          NEXT_PUBLIC_JUKI_SERVICE_V2_URL: process.env.VITE_JUKI_SERVICE_V2_URL ?? '',
          NEXT_PUBLIC_JUKI_TOKEN_NAME: process.env.VITE_JUKI_TOKEN_NAME ?? '',
        },
      },
      server: {
        allowedHosts: [ 'storybook.local.juki.app', 'localhost' ],
        hmr: {
          protocol: 'wss',
          host: 'storybook.local.juki.app',
          clientPort: 443,
        },
      },
    });
  },
};

export default config;
