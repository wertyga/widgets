import fs from 'fs';
import shortId from 'short-id';
import path from 'path';
import axios from 'axios';
import shell from "shelljs";
import cheerio from 'cheerio';
import { permissionDeniedError } from "../utils";
import { Domain, Client, Styles } from "../models";
import { config } from '../config';

export const getAuthToken = (headers) => (
  headers.authorization && headers.authorization.replace('Bearer', '').trim()
);
export const getDefaultLang = (headers) => (
  headers['accept-language'] && headers['accept-language'].split(',')[0].split('-')[0]
);

export const checkCredentialsForMain = async (headers, services, withStyles) => {
  const { authorization, origin } = headers;
  const defaultLang = getDefaultLang(headers);
  const error = permissionDeniedError(defaultLang);
  if (
    !authorization ||
    !origin ||
    authorization === 'undefined' ||
    origin === 'undefined'
  ) {
    return { isValid: false, error: permissionDeniedError(defaultLang) };
  }
  const token = getAuthToken(headers);
  const query = { token };
  if (!/localhost/.test(origin)) { // Check for localhost testing
    query.origin = origin;
  }

  const domain = await Domain.findOne(query);
  if (!domain) return { isValid: false, error };

  const isServiceInList = domain.services.find(service => services.find(item => item === service));
  if (!isServiceInList) return { isValid: false, error: permissionDeniedError(domain.lang || defaultLang) };

  const [client, styles] = await Promise.all([
    Client.findById(domain.owner),
    withStyles && Styles.find({ domain: domain._id, service: services }),
  ]);
  return { isValid: true, client, lang: domain.lang, domain, styles };
};

export const getFavicon = async (url) => {
  try {
    const { data } = await axios({
      method: 'get',
      url,
    });
    const $ = cheerio.load(data);
    const href =
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href');
    const prefix = /https|http/.test(href) ? '' : url;
    return `${prefix}${href}`;
  } catch (e) {
    return '';
  }
};

export const handleSaveFiles = async (files = [], customPath = '', isGenerate = true, withDelete = false) => {
  const { uploads: { uploadPath } } = config;
  
  return Promise.all(files.map(({ name, stream, filename }) => {
    const ext = filename.split('.').reverse()[0];
    const currentFileName = isGenerate ? shortId.generate() : name;
    const currentUploadPath = path.join(uploadPath, customPath);
    if (withDelete) {
      shell.rm('-rf', `${currentUploadPath}/${currentFileName}.*`);
    }
    shell.mkdir('-p', currentUploadPath);
    const ws = fs.createWriteStream(`${currentUploadPath}/${currentFileName}.${ext}`);
    return stream.pipe(ws);
  }));
};
