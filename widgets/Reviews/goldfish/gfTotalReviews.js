import { getNoun } from '../../../utils';

export const gfTotalReviews = {
  totalCount: {
    en: (count) => (`Total reviews: ${count}`),
    ru: (count) => (`Всего отзывов: ${count}`),
  },
  empty: {
    en: 'There is no such reviews',
    ru: 'Комментариев пока нет',
  },
  totalRating: {
    en: (count) => (`${count} ${getNoun(count, 'rating', 'ratings','ratings')}`),
    ru: (count) => (`${count} ${getNoun(count, 'оценка', 'оценки', 'оценок')}`),
  },
};
