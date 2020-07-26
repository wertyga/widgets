import { gfErrors } from '../config';

export const permissionDeniedError = (side = 'en') => {
  const error = new Error(gfErrors.permissionDenied[side]);
  error.status = 403;
  return error;
};

export const noValidDataError = (lang = 'en') => {
  const error = new Error(gfErrors.noValidData[lang]);
  error.status = 404;
  return error;
};

export const dataExistError = (lang = 'en') => {
  const error = new Error(gfErrors.dataExist[lang]);
  error.status = 400;
  return error;
};
