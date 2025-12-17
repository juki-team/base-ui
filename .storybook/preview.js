const customViewports = {
  small: {
    name: 'small, Phones',
    styles: {
      width: '280px',
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
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    options: customViewports,
  },
};

export const tags = [ 'autodocs' ];
