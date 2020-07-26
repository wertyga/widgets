import { errors as configErrors } from '../../config/lang';
import { _isEmpty } from '../../../utils';

const checkEmail = email => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);

export const userCheck = (userInfo, lang) => {
  const errors = {};

  Object.entries(userInfo).forEach(([key, value]) => {
    if (key === 'errors') return;
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
