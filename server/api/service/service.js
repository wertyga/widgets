import express from 'express';

import { Domain, Review } from '~/server/models';
import { checkClientCredentials } from '~/server/middlewares';

import { getServicePages, getServiceCounts } from './helpers';

export const serviceRouter = express.Router();

serviceRouter.get('/:service/pages', checkClientCredentials, async ({ client, params: { service } }, res) => {
    try {
        const pages = await getServicePages(service, client._id);
        
        const sortedByOrigin = pages.reduce((init, next) => ({
            ...init,
            [next.origin]: {
                items: {
                    ...(init[next.origin] ? init[next.origin].items : {}),
                    [next.href]: {
                        pagesCount: pages.filter(({ origin, href }) => origin === next.origin && href === next.href).length,
                    },
                },
                count: pages.filter(({ origin }) => origin === next.origin).length,
            },
        }), {});
        
        res.json(sortedByOrigin);
    } catch (e) {
      res.status(e.status || 500).json({ messsage: e.message });
    }
   });

   serviceRouter.get(
       '/:service/count', 
       checkClientCredentials, 
       async ({ client, params: { service }}, res) => {
        try {
            const serviceCounts = await getServiceCounts(service, client._id);
            
            res.json(serviceCounts);
        } catch (e) {
        res.status(e.status || 500).json({ messsage: e.message });
        }
   });