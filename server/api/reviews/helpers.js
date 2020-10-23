import fs from 'fs';
import path from 'path';
import shortID from 'short-id';
import shell from 'shelljs';
import parseFormData from 'parse-formdata';

import _isEmpty from 'lodash/isEmpty';

import { Review } from '../../models';
import { config, gfErrors } from '../../config';

const REQUIRE_FIELDS = ['user', 'advantages', 'disAdvantages', 'href', 'rating'];
export const REVIEWS_LIMIT = 10;

export const getUploadPath = (client, filename, prefix = '') => (
  path.join(`${config.uploads.uploadPath}/reviews`, `${String(client._id)}/${String(prefix)}${filename ? `/${filename}` : ''}`)
);
const createUploadDirectory = (client, domain) => {
  const uploadDirectory = getUploadPath(client, domain._id);
  shell.mkdir('-p', uploadDirectory);
};

export const calculateCommonRating = (totalRating) => {
  let totalCount = 0;
  let totalSum = 0;
  Object.entries(totalRating).forEach(([rating, count]) => {
    totalCount += count;
    totalSum += rating * count;
  });

  return Number((totalSum / totalCount).toFixed(1)) || 0;
};

export const calculateTotalRating = (reviews) => {
  const defaultRating = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  return reviews.reduce((init, { rating }) => ({
    ...init,
    [rating]: (init.rating || 0) + 1,
  }), defaultRating)
};

const saveReviewImages = async (files, client, review) => {
  try {
    const filePath = files.map(file => {
      const ext = file.mimetype.split('/')[1];
      const filename = `${shortID.generate()}.${ext}`;
      return getUploadPath(client, filename, review._id);
    });

    if (filePath.length) {
      createUploadDirectory(client, review);
      await Promise.all(filePath.map((uploadPath, i) => {
        const ws = fs.createWriteStream(uploadPath);
        files[i].stream.pipe(ws);
      }));
    }

    return filePath.map(item => item.replace(config.uploads.uploadPath, ''));
  } catch (e) {
    console.log(e);
    return [];
  }
};

const checkRequireFields = (fields, lang) => {
  const errors = {};
  const parsedData = JSON.parse(fields.reviewsData || '{}');
  REQUIRE_FIELDS.forEach((field) => {
    if (!parsedData[field]) errors[field] = gfErrors.fillField[lang];
  });

  return {
    isValid: _isEmpty(errors),
    errors,
    data: parsedData,
  };
};

export const uploadReview = ({ req, res }) => {
  parseFormData(req, async function (err, data) {
    const { client, lang } = req;
    try {
      if (err) throw err;

      const { isValid, errors, data: fields } = checkRequireFields(data.fields, lang);
      if (!isValid) return res.status(400).json(errors);

      const { origin, settings: { reviews: { preEdit } = {} } = {} } = req.userDomain;
      const review = await new Review({
          ...fields,
          owner: client._id,
          origin,
          allowed: !preEdit,
       }).save();
      review.images = await saveReviewImages(data.parts, client, review);

      const [reviews, updatedreview] = await Promise.all([
        Review.find({ href: review.href, allowed: true }, 'rating'),
        !!review.images.length ? review.save() : review,
      ]);

      const totalRating = calculateTotalRating(reviews);
      res.json({
        review: {
          ...updatedreview.responseKeys,
          like: updatedreview.like.length,
          dislike: updatedreview.dislike.length,
          commonRating: calculateCommonRating(totalRating),
          preEdit,
        },
        totalCount: reviews.length,
        totalRating,
      });
    } catch (e) {
      console.log(e)
      res.status(e.status || 500).json({ global: e.message });
    }
  })
};
