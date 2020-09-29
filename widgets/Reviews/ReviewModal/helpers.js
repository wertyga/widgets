import { errors as configErrors } from '../../config/lang';
import { _isEmpty } from '../../../utils';

const MAX_SIZE = 5000000; // 5 MB

export const checkPublishData = (data, lang) => {
  const errors = {};
  Object.entries(data).forEach(([key, value]) => {
    if (!value) errors[key] = configErrors.unFilled[lang];
    if (key === 'rating' && !value) errors.rating = configErrors.unfilledRating[lang];
  });

  return {
    isValid: _isEmpty(errors),
    errors,
  };
};

export const checkImage = ({ size, type }, lang, maxSize = MAX_SIZE) => {
  const errors = {};
  if (type.indexOf('image') === -1) errors.type = configErrors.imageType[lang];
  if (size > maxSize) errors.size = configErrors.imageSize[lang];

  return {
    isValid: _isEmpty(errors),
    errors,
  };
};


