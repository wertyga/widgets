import { gfMessages } from '../goldfish';

const AFTER_LOAD_CLOSE_TIME = 3000;

export const getAfterSaveMessage = (review, lang) => {
  return !review.allowed && review.preEdit && gfMessages.preEdit[lang];
};
export const closeModalTime = (message) => message ? AFTER_LOAD_CLOSE_TIME : 0;

