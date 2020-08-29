import express from 'express';
import { checkClientCredentials } from '~/server/middlewares';

import { getServiceCounts } from './helpers';

export const adminServiceRouter = express.Router();

adminServiceRouter.get('/:service/count', checkClientCredentials, async ({ client, params: { service }}, res) => {
  try {
    const serviceCounts = await getServiceCounts(service, client._id);

    res.json(serviceCounts);
  } catch (e) {
    res.status(e.status || 500).json({ messsage: e.message });
  }
});