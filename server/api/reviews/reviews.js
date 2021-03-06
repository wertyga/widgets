import express from 'express';

import { uploadReview, calculateRating, REVIEWS_LIMIT } from './helpers';
import { Review, SubReview } from '../../models';
import { reviewCredentials } from '../../middlewares/credentials';

export const reviewRouter = express.Router();

reviewRouter.get('/get', reviewCredentials, async (req, res) => {
  const { query: { href, offset } } = req;
  try {
    const from = parseInt(offset);

    const [reviews, totalReviews] = await Promise.all([
      Review.find({ href, allowed: true })
        .skip(from)
        .limit(REVIEWS_LIMIT)
        .sort({ createdAt: -1 })
        .populate('subComment', ['text', 'user', 'createdAt']),
      Review.find({ href, allowed: true }, 'rating'),
    ]);

    const editedReviews =
      reviews.map(review => ({
        ...review.responseKeys,
        like: review.like.length,
        dislike: review.dislike.length,
    }));
    const { commonRating, totalRating } = calculateRating(totalReviews);
    res.json({
      reviews: editedReviews,
      commonRating,
      totalCount: totalReviews.length,
      totalRating,
    });
  } catch (e) {
    res.status(e.status || 500).json({ global: e.message });
  }
});

reviewRouter.post('/post', reviewCredentials, async (req, res) => {
  try {
    const review = await uploadReview(req);
    res.json(review);
  } catch (e) {
    res.status(e.status || 500).json(e.error);
  }
});

reviewRouter.post('/like', reviewCredentials, async (req, res) => {
  try {
    const { body: { _id, type }, fingerprint: { hash } = {} } = req;

    const review = await Review.findById(_id);
    const exist = review[type].find(user => user === hash);
    review.like = review.like.filter(user => user !== hash);
    review.dislike = review.dislike.filter(user => user !== hash);

    if (!exist) review[type] = [...review[type], hash];

    const { like, dislike } = await review.save();

    res.json({
      like: like.length,
      dislike: dislike.length,
    });
  } catch (e) {
    res.status(e.status || 500).json({ global: e.message });
  }
});

reviewRouter.post('/subreview', reviewCredentials, async (req, res) => {
  const { body: { commentId, text, user } } = req;
  try {
    if (!commentId || !text) throw new Error('No such params');
    const subReview = await new SubReview({
      parentId: commentId,
      text,
      user,
    }).save();

    res.json(subReview);
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message });
  }
});

