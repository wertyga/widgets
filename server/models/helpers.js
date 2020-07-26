import crypto from 'crypto';
import { config } from '../config/config';

export const generateHash = (value) => {
    return crypto.createHmac('sha256', config.hash.secret)
      .update(value)
      .digest('hex');
  };