const path = require('path');
const envs = require('../../webpack/envs');

const dbName = 'widgets';

const config = {
  hash: {
    secret: 'Booom!!',
  },
  serverAddress: process.env !== 'production' ? `http://localhost:${envs.PORT}` : `http://localhost:${envs.PORT}`,
  mongoose: {
    uri: `mongodb://localhost/${dbName}`,
  },
  userCookie: 'w-widgets-user',
  services: {
    reviews: 'reviews',
    support: 'support',
    chat: 'chat',
  },
  languages: ['ru', 'en'],
  uploads: {
    uploadPath: path.join(process.cwd(), 'UPLOAD'),
    maxFileSize: 50000000,
  },
};

module.exports = {
  config,
};
