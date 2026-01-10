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

  a11y: {
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: 'todo'
  }
};

export const tags = [ 'autodocs' ];
