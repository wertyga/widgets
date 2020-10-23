import mongoose from 'mongoose';
import _isEmpty from 'lodash/isEmpty';
import { gfServerSettings } from '../goldfish';
import { generateHash } from './helpers';

const domainSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    origin: {
        type: String,
        require: true,
      },
    token: {
      type: String,
    },
    lang: {
      type: String,
      require: true,
     },
     favicon: {
       type: String,
    },
    services: [
      {
        type: String,
        require: true,
       },
    ],
    settings: {
      type: Object,
      default: {},
    },
});

domainSchema.statics.domainFields = function(domain) {
  const availableFields = ['origin', '_id', 'lang', 'favicon', 'services', 'token', 'settings'];
  return availableFields.reduce((init, key) => ({
    ...init,
    [key]: domain[key],
  }), {})
};

domainSchema.statics.getClient = async function(token) {
  return this.findOne({ token }).populate('owner');
};

domainSchema.statics.saveWithToken = async function(data) {
  const token = `${generateHash(String(data.owner))}.${generateHash(data.origin)}`;
  return this({ ...data, token }).save();
};

domainSchema.pre('save', function(next) {
  if (_isEmpty(this.settings)) {
    this.settings = gfServerSettings.defaultSettings;
  }
  next();
});

export const Domain = mongoose.model('domain', domainSchema);
