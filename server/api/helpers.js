import axios from 'axios';
import cheerio from 'cheerio';
import { permissionDeniedError } from "../utils";
import { Domain, Client, Styles } from "../models";

export const getAuthToken = (headers) => (
  headers.authorization && headers.authorization.replace('Bearer', '').trim()
);
export const getDefaultLang = (headers) => (
  headers['accept-language'] && headers['accept-language'].split(',')[0].split('-')[0]
);

export const checkCredentialsForMain = async (headers, services) => {
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
    Styles.find({ domain: domain._id }),
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
