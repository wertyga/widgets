import fs from 'fs';
import path from 'path';
import shortID from 'short-id';
import shell from 'shelljs';
import parseFormData from 'parse-formdata';
import { logger } from 'server/utils/logger';

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
    [rating]: init[rating] + 1,
  }), defaultRating)
};

export const calculateRating = (reviews) => {
  let totalCount = 0;
  let totalSum = 0;
  const formattedReviews = reviews.map(({ _doc }) => _doc);
  const totalRating = calculateTotalRating(formattedReviews);
  Object.entries(totalRating).forEach(([rating, count]) => {
    totalCount += count;
    totalSum += rating * count;
  });

  return {
    totalRating,
    commonRating: Number((totalSum / totalCount).toFixed(1)) || 0,
  };
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

export const getDataFromFormData = (req) => {
  return new Promise((resolve, reject) => {
    parseFormData(req, function (err, data) {
      const { lang } = req;
      const { isValid, errors, data: fields } = checkRequireFields(data.fields, lang);
      if (err) {
        reject({ error: err });
      }
      if (!isValid) {
        reject({ error: errors, status: 400 });
      }
      
      resolve({ fields, parts: data.parts });
    });
  });
};

export const uploadReview = async (req) => {
  try {
    const { fields, parts } = await getDataFromFormData(req);
    const { client } = req;
  
    const { origin, settings: { reviews: { preEdit } = {} } = {} } = req.userDomain;
    const review = await new Review({
      ...fields,
      owner: client._id,
      origin,
      allowed: !preEdit,
    }).save();
    if (parts.length) {
      review.images = await saveReviewImages(parts, client, review);
    }
    const [reviews, updatedReview] = await Promise.all([
      Review.find({ href: review.href, allowed: true }, 'rating'),
      !!review.images.length ? review.save() : review,
    ]);
    
    const { commonRating, totalRating } = calculateRating(reviews);
    return {
      review: {
        ...updatedReview.responseKeys,
        like: updatedReview.like.length,
        dislike: updatedReview.dislike.length,
        commonRating,
        preEdit,
      },
      totalCount: reviews.length,
      totalRating,
    };
  } catch (e) {
    console.log(e);
    logger.error(e, 'catch-uploadReview');
    throw { error: { global: e.message }, status: e.status || 500 };
  }
};
