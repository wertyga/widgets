import { config } from '../../server/config/config';
import { getCookie, setCookie } from '../../utils';

export const getUser = () => {
  const hashedUser = getCookie(config.userCookie);
  if (!hashedUser) return false;

  const user = window.atob(hashedUser);
  if (user) return JSON.parse(user);
};

export const saveUser = (user) => {
  const hashedUser = window.btoa(JSON.stringify(user));
  setCookie(config.userCookie, hashedUser);
};

export const dropUser = () => {
  setCookie(config.userCookie, '');
};
