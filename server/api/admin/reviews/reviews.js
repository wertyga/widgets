import express from 'express';
import shell from 'shelljs';

import { Review } from '~/server/models';
import { checkClientCredentials, isClientOwnerDomain } from '~/server/middlewares';
import { noValidDataError } from '~/server/utils';

import { getUploadPath } from '../../reviews/helpers';

export const adminReviewsRouter = express.Router();

adminReviewsRouter.get(
  '/',
  checkClientCredentials,
  async ({ client, query: { offset, limit, href } }, res) => {
    try {
      const [reviews, totalCount] = await Promise.all([
        Review.find({ owner: client._id, href })
          .skip(parseInt(offset))
          .limit(parseInt(limit))
          .populate('subComment'),
        Review.find({ owner: client._id, href }).count(),
      ])

      res.json({
        reviews: reviews.map(item => item.responseKeys),
        totalCount,
      });
    } catch (e) {
      res.status(e.status || 500).json({ messsage: e.message });
    }
  });

adminReviewsRouter.post(
  '/allowed',
  checkClientCredentials,
  isClientOwnerDomain,
  async ({ body: { id, allowed } }, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(id,
        { $set: { allowed: !allowed }},
        { new: true },
      ).populate('subComment');

      res.json(updatedReview.responseKeys);
    } catch (e) {
      res.status(e.status || 500).json({ error: e.message });
    }
});

adminReviewsRouter.delete('/', checkClientCredentials, async (req, res) => {
  try {
    const { query: { review, lang }, client } = req;
    if (!review) throw noValidDataError(lang);

    await Promise.all([
      Review.findByIdAndRemove(review),
      shell.rm('-rf', getUploadPath(client, review)),
    ])

    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).json({ messsage: e.message });
  }
});

