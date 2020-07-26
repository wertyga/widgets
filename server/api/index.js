import express from 'express';
import { reviewRouter } from './reviews/reviews';
import { clientRouter } from './client/client';
import { domainsRouter } from './domains';
import { paymentsRouter } from './payments/payments';
import { serviceRouter } from './service/service';
//
import { etcRouter } from './etc';

export const api = express.Router();

api.use('/etc', etcRouter);
api.use('/reviews', reviewRouter);
api.use('/client', clientRouter);
api.use('/payments', paymentsRouter);
api.use('/domains', domainsRouter);
api.use('/service', serviceRouter);
