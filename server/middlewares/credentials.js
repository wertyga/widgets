import { config } from '../config';
import { checkCredentialsForMain, getAuthToken, getDefaultLang } from '../api/helpers';
import { Client, Domain } from '../models';
import { noValidDataError, permissionDeniedError } from '../utils';

export const reviewCredentials = async (req, res, next) => {
  try {
    const domainToken = getAuthToken(req.headers);
    const defaultLang = getDefaultLang(req.headers);
    if (!domainToken) throw permissionDeniedError(defaultLang);

    const { isValid, client, lang } = await checkCredentialsForMain(req.headers, [config.services.reviews]);
    if (!isValid) throw error;

    req.client = client;
    req.lang = lang;
    next();
  } catch (e) {
    res.status(e.status || 500).json({ global: e.message });
  }
};

export const checkClientCredentials = async (req, res, next) => {
  try {
    const clientToken = req.headers.token;
    const { lang } = req.query;
    if (!clientToken) throw noValidDataError(lang);

    const client = await Client.findOne({ token: clientToken  });
    if (!client) throw noValidDataError(lang);

    req.client = client;
    next();
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
};

export const isClientOwnerDomain = async (req, res, next) => {
  const { 
    client, 
    body: { id, domainId, _id },
    query: { lang },
  } = req;
  if (!client) {
    const { status, message } = permissionDeniedError(lang);
    return res.status(status).json({ message });
  }
  const currentDomainId = id || domainId || _id;
  const userDomain = await Domain.findOne({ owner: client._id, _id: currentDomainId });
  
  if (!userDomain) {
    const { status, message } = permissionDeniedError(lang);
    return res.status(status).json({ message });
  }

  next();
};

