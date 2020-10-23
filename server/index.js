const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { config } = require('./config/config');

import './mongoose/mongoose';

import Fingerprint from 'express-fingerprint';
import { getSrcs } from './helpers';
import { checkCredentialsForMain } from './api/helpers';
import { api } from './api';

dotenv.config();
const server = express();

server.use(Fingerprint({
  parameters: [
    Fingerprint.useragent,
    Fingerprint.acceptHeaders,
    Fingerprint.geoip,
  ],
}));
server.use(bodyParser.json());
server.use(cors());
server.use(express.static(path.join(process.cwd(), 'public')));
server.use(express.static(config.uploads.uploadPath));

server.use('/api', api);

server.post('/main', async ({ body: { ids }, headers }, res) => {
  try {
    const { isValid, error, domain, styles, lang } = await checkCredentialsForMain(headers, ids, true);
    if (!isValid) throw error;

    const { scripts, css, addingStyles } = getSrcs(ids, domain._doc, lang, styles);
    res.set({ 'Cache-Control': 'max-age=2592000' });
    res.json({ scripts, css, addingStyles });
  } catch (e) {
    res.status(e.status || 500).json({ global: e.message });
  }
});

server.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), `public/${process.env.JS_RENDER}`));
});

server.listen(process.env.PORT, () => console.log(`Server ran on :${process.env.PORT}`));
