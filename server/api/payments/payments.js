import express from 'express';
import { checkClientCredentials } from 'server/middlewares';
import { noValidDataError, permissionDeniedError } from 'server/utils';
import { Payment, Client } from 'server/models';
import { yandexAuth } from './helpers';

// import { handleUpdateClientDomain } from './client/helpers';
// import { getFavicon } from './helpers';

export const paymentsRouter = express.Router();

paymentsRouter.post('/yandex', checkClientCredentials, async ({ 
    body: { type, sum },
    client, 
    query: { lang },
   } ,res) => {
    try {
        // const auth = await yandexAuth({ lang, type, sum });
        throw permissionDeniedError(lang)
        // const payment = await new Payment({
        //     type,
        //     sum,
        //     owner: client._id,
        //     status: 'initial',
        //     lang,
        // }).save();
        res.json({});
    } catch (e) {
      res.status(e.status || 500).json({ message: e.message });
    }
  });

  paymentsRouter.post('/paypal', checkClientCredentials, async ({ 
    body: { type, sum },
    client, 
    query: { lang },
   } ,res) => {
    try {
        if (!client) throw noValidDataError(lang);
        
        // const payment = await new Payment({
        //     type,
        //     sum,
        //     owner: client._id,
        //     status: 'initial',
        //     lang,
        // }).save();
        res.send({});
    } catch (e) {
      res.status(e.status || 500).json({ message: e.message });
    }
  });