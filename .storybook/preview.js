// import '../src/styles/base/_index.scss';
import { allModes } from "../.storybook/modes";

if (typeof global.process === 'undefined') {
  // Estamos en el navegador (probablemente producción)
  console.info('[MSW] MSW no se inicializa en producción');
} else {
  const { initialize } = require('msw-storybook-addon');
  initialize({
    onUnhandledRequest: 'bypass',
  });
  // export const decorators = [mswDecorator];
}

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

const PING = {
  'success': true,
  'message': 'OK',
  'content': {
    'user': {
      'nickname': 'OscarGauss',
      'imageUrl': 'https://images.juki.pub/u/7a011822-b4b7-4cfa-b487-bfe946624f8d.png',
      'settings': {
        'preferredLanguage': 'ES',
        'preferredTheme': 'LIGHT',
        'preferredDataViewMode': 'ROWS',
        'preferredMenuViewMode': 'VERTICAL',
        'newsletterSubscription': true,
      },
      'permissions': {
        'users': {
          'create': true,
          'manage': true,
          'administrate': true,
        },
        'problems': {
          'create': true,
          'manage': true,
        },
        'submissions': {
          'manage': true,
        },
        'contests': {
          'create': true,
          'manage': true,
        },
        'company': {
          'manage': true,
          'administrate': true,
        },
        'services': {
          'administrate': true,
        },
      },
      'sessionId': '6848e5f1c9a6b84e1a2d4cf9',
      'isLogged': true,
    },
    'company': {
      'key': 'juki-app',
      'contactEmail': 'contact@juki.app',
      'contactCellPhoneNumber': '+591 79153358',
      'contactTelegram': 't.me/OscarGauss',
      'imageUrl': 'https://images.juki.pub/c/juki-judge-horizontal-white-logo.svg',
      'name': 'Juki',
      'codeEditorRunEnabled': true,
    },
  },
};

export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },
  // msw: {
  //   handlers: [
  //     // no working with WS, because juki websocket needs a valid session
  //     // http.get('https://api.juki.app/v2/auth/ping', () => {
  //     //   return HttpResponse.json(PING);
  //     // }),
  //     // http.get('https://api.juki.app/v2/locale/EN/translation', () => {
  //     //   return HttpResponse.json({});
  //     // }),
  //     // http.get('https://api.juki.app/v2/locale/ES/translation', () => {
  //     //   return HttpResponse.json({});
  //     // }),
  //   ],
  // },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,
  },
  chromatic: {
    modes: {
      mobile: allModes["mobile"],
      tablet: allModes["tablet"],
      desktop: allModes["desktop"],
      bigscreen: allModes["bigscreen"],
    },
  },
};

export const tags = [ 'autodocs' ];

// export const loaders = [ mswLoader ];
