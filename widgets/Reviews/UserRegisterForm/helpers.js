import CryptoJS from 'crypto-js';
import { errors as configErrors } from '../../config/lang';
import { _isEmpty } from '../../../utils';
import { config } from "../../config/config";

const defaultGravatar = 'https://www.gravatar.com/avatar/bdb60e051b5eb59ad2a537bce0868159';
const anonymAvatar = `${process.env.SERVER_HOST}/static/anonym.png`;

const checkEmail = email => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);

export const userCheck = (userInfo, lang) => {
  const errors = {};

  Object.entries(userInfo).forEach(([key, value]) => {
    if (/errors/.test(key)) return;
    if (key === 'email' && !checkEmail(value)) {
      errors.email = configErrors.emailError[lang];
    }
    if (!value) errors[key] = configErrors.unFilled[lang];
  });


  return {
    isValid: _isEmpty(errors),
    errors,
  };
};

export const getUserCanvasAvatar = (imageRef) => {
  const imgCanvas = document.createElement("canvas");
  const imgContext = imgCanvas.getContext("2d");

  const width = imageRef.naturalWidth;
  const height = imageRef.naturalHeight;
  const largestSize = width > height ? 'width' : 'height';

  let actualWidth;
  let actualHeight;
  const dimension = largestSize === 'width' ? width / height : height / width;
  if (largestSize === 'width') {
    actualWidth = imageRef.offsetWidth * dimension;
    actualHeight = imageRef.offsetHeight;
  } else {
    actualWidth = imageRef.offsetWidth;
    actualHeight = imageRef.offsetHeight * dimension;
  }

  imgCanvas.width = actualWidth;
  imgCanvas.height = actualHeight;
  imgContext.drawImage(imageRef, 0, 0, actualWidth, actualHeight);

  return imgCanvas.toDataURL("image/png", 0);
};

export const getUserGravatar = (email) => {
  const md5Email = CryptoJS.MD5(email);
  const gravatar = `https://www.gravatar.com/avatar/${md5Email}?s=50`;
  if (gravatar.indexOf(defaultGravatar) !== -1) return anonymAvatar;
  return gravatar;
};
