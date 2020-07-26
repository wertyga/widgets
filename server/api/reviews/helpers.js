import fs from 'fs';
import path from 'path';
import shortID from 'short-id';
import shell from 'shelljs';
import parseFormData from 'parse-formdata';

import _isEmpty from 'lodash/isEmpty';

import { Review, ReviewLegend } from '../../models';
import { config, gfErrors } from '../../config';

const REQUIRE_FIELDS = ['user', 'advantages', 'disAdvantages', 'href', 'rating'];
export const REVIEWS_LIMIT = 3;

const getUploadPath = (client, domain, filename) => (
  path.join(`${config.uploads.uploadPath}/reviews`, `${String(client._id)}/${String(domain._id)}${filename ? `/${filename}` : ''}`)
);
const createUploadDirectory = (client, domain) => {
  const uploadDirectory = getUploadPath(client, domain);
  shell.mkdir('-p', uploadDirectory);
};

export const getCommonRating = async (fixed, href) => {
  const ratings = await Review.find({ href }, 'rating');
  if (!ratings.length) return '0';

  const commonRating = ratings.reduce((init, { rating }) => init + rating, 0) / ratings.length;

  return fixed ? commonRating.toFixed(fixed) : commonRating;
};

const saveReview = async (data) => {
  const review = await Review.saveWithUpdate(data);
  const commonRating = await getCommonRating(1, data.href);
  return {
    review,
    commonRating,
  };
};

const saveReviewImages = async (files, client, review) => {
  const filePath = files.map(file => {
    const ext = file.mimetype.split('/')[1];
    const filename = `${shortID.generate()}.${ext}`;
    return getUploadPath(client, review, filename);
  });

  createUploadDirectory(client, review);

  await Promise.all(filePath.map((uploadPath, i) => {
    const ws = fs.createWriteStream(uploadPath);
    files[i].stream.pipe(ws);
  }));

  return filePath.map(item => item.replace(config.uploads.uploadPath, ''));
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

      const { review, commonRating } = await saveReview({ ...fields, owner: client._id });
      review.images = await saveReviewImages(data.parts, client, review);
      const [updatedReview, totalCount, totalRating] = await Promise.all([
        review.save(),
        Review.find({ href: review.href }).count(),
        ReviewLegend.findRating(review.href, review.rating),
      ]);

      res.json({
        review: {
          ...updatedReview._doc,
          like: updatedReview.like.length,
          dislike: updatedReview.dislike.length,
          commonRating,
        },
        totalCount,
        totalRating,
      });
    } catch (e) {
      res.status(e.status || 500).json({ global: e.message });
    }
  })
};
