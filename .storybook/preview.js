import '../src/styles/base/_index.scss';

const customViewports = {
  small: {
    name: 'small, Phones',
    styles: {
      width: '320px',
      height: '480px',
    },
  },
  medium: {
    name: 'medium, Tablets',
    styles: {
      width: '640px',
      height: '480px',
    },
  },
  large: {
    name: 'large, Pcs',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },
  huge: {
    name: 'huge, Large Pcs',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,
  },
};
