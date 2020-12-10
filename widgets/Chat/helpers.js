import { getStorage } from 'utils';
import {config} from '../config/config';

export const getChatMeta = () => {
  if (typeof window ==='undefined') return {};
  const {
    settings: {
      chat: {
        supportName,
        supportGreeting,
        supportPosition,
        supportAvatar = '/static/chat/supportAvatar.png',
      },
    } = {},
  } = getStorage();
  return {
    supportName,
    supportPosition,
    supportGreeting,
    supportAvatar: `${process.env.SERVER_HOST}${supportAvatar}`,
  };
};
