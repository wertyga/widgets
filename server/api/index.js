import express from 'express';
import { reviewRouter } from './reviews/reviews';
import { adminClientRouter } from './admin/client/client';
import { adminDomainsRouter } from './admin/domains/domains';
// import { paymentsRouter } from './payments/payments';
import { adminServiceRouter } from './admin/service/service';
import { adminReviewsRouter } from './admin/reviews/reviews';

export const api = express.Router();

api.use('/reviews', reviewRouter);
api.use('/admin/client', adminClientRouter);
// api.use('/payments', paymentsRouter);
api.use('/admin/domains', adminDomainsRouter);
api.use('/admin/service', adminServiceRouter);
api.use('/admin/reviews', adminReviewsRouter);
