import express from 'express';
import _isEmpty from 'lodash/isEmpty';
import { checkClientCredentials, isClientOwnerDomain, withFilesMiddleware } from 'server/middlewares';
import { noValidDataError, clearDomain, permissionDeniedError, getWithNumbers } from 'server/utils';
import { Domain } from 'server/models';
import { gfErrors, config } from 'server/config';

import { getFavicon, handleSaveFiles } from '../../helpers';

export const adminDomainsRouter = express.Router();

adminDomainsRouter.get('/', checkClientCredentials, async (req, res) => {
  const { client } = req;
  try {
    const clientDomains = await Domain.find({ owner: client._id });

    res.json({ domains: clientDomains.map(Domain.domainFields) })
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
});

adminDomainsRouter.post('/', checkClientCredentials, async ({
  client,
  body: { origin, services, serviceLang, domainId },
  query: { lang },
 }, res) => {
 try {
   if (!origin || !services || !services.length || !serviceLang) {
      throw noValidDataError(lang);
   }

    const existDomain = await Domain.findOne({ origin: { $regex: new RegExp(clearDomain(origin)), $options: 'i' } });
    const domainExistError = new Error(gfErrors.domainExist[lang])
    domainExistError.status = 400;

    const editedOrigin = origin.trim().replace(/\/$/, '');
    if (domainId) {
      if (
        existDomain &&
        clearDomain(origin) === clearDomain(existDomain.origin) &&
        domainId !== String(existDomain._id)
      ) {
        throw domainExistError;
      }

      const favicon = await getFavicon(origin);
      await Domain.findByIdAndUpdate(
        domainId,
        { $set: { origin: editedOrigin, services, lang: serviceLang, favicon } }
      );
     } else {
      if (existDomain) throw domainExistError;

      const favicon = await getFavicon(origin);
      await Domain.saveWithToken({
        origin: editedOrigin, services, lang: serviceLang, owner: client._id, favicon,
       });
     }

  const userDomains = await Domain.find({ owner: client._id });

  res.json({ domains: userDomains.map(Domain.domainFields) });
 } catch (e) {
  res.status(e.status || 500).json({ message: e.message });
 }
});

adminDomainsRouter.delete('/', checkClientCredentials, isClientOwnerDomain, async ({
  body: { domainId },
 } ,res) => {
  try {
    await Domain.deleteOne({ _id: domainId });

    res.json({ success: true });
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
});

adminDomainsRouter.post('/settings/:service/:id', checkClientCredentials, withFilesMiddleware, async (
  {
    params: { service, id },
    query: { lang },
    client,
    fields,
    files,
  },
  res,
 ) => {
  try {
    if (!fields || _isEmpty(fields)) throw noValidDataError(lang);
  
    const domain = await Domain.findOne({ owner: client._id, _id: id });
    if (!domain) throw permissionDeniedError(lang);
    
    const partUploadPath = `${service}/${id}`;
    const savedFiles = await handleSaveFiles(files, partUploadPath, false, true);
    
    const uploadFiles = savedFiles.reduce((init, { path }, i) => {
      const key = files[i].name;
      const value = path.replace(config.uploads.uploadPath, '');
      
      return { ...init, [key]: value };
    }, {});
    
    domain.settings = {
      ...domain.settings,
      [service]: {
        ...domain.settings[service],
        ...getWithNumbers(fields),
        ...uploadFiles,
      },
    };
    const updatedDomain = await domain.save();
    
    res.json(Domain.domainFields(updatedDomain));
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).json({ message: e.message });
  }
});
