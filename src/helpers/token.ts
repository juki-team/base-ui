import { jukiSettings } from '../config';

export const getLocalToken = () => {
  let queryToken = '';
  if (typeof window !== 'undefined') {
    queryToken = (new URLSearchParams(window.location.search)).get('token') ?? '';
  }
  return queryToken ?? (localStorage.getItem(jukiSettings.TOKEN_NAME) || '');
}
