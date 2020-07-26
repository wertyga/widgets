import mongoose from 'mongoose';
import shortID from 'short-id';
import { noValidDataError } from 'server/utils/errors';
import { generateHash  } from './helpers';

import { clearDomain } from '../utils';

const clientSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  hashPassword: {
    type: String,
    require: true,
    unique: true,
  },
  token: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
});

export const generateToken = (domain) => {
  return `${generateHash(domain)}.${generateHash(shortID.generate())}`;
};

clientSchema.virtual('password')
  .get(function() {
    return this.hashPassword;
  })
  .set(function(password) {
    this.set({ hashPassword: generateHash(password)});
  });

clientSchema.statics.comparePasswords = (hashedPassword, password) => (
  hashedPassword === generateHash(password)
);

clientSchema.statics.saveClientWithNewToken = async function(data, lang, isNew) {
  const client = await this.findOne({ username: data.username });
  const isValid = isNew ? !client : !!client;
  if (!isValid) throw noValidDataError(lang);
  if (!isNew) {
    const isPasswordValid = this.comparePasswords(client.password, data.password);
    if (!isPasswordValid) throw noValidDataError(lang);
  }

  const token = `${generateHash(data.username)}.${generateHash(shortID.generate())}`;
  if (isNew) {
    return new this({
      ...data,
      token,
    }).save();
  } else {
    client.token = token;
    return client.save();
  }
};

export const Client = mongoose.model('client', clientSchema);
