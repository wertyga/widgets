import mongoose from 'mongoose';

import { ReviewLegend } from './reviweLegend';

const reviewSchema = new mongoose.Schema({
  advantages: {
    type: String,
    require: true,
  },
  disAdvantages: {
    type: String,
    require: true,
  },
  comments: {
    type: String,
  },
  user: {
    type: { name: String, email: String },
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  href: {
    type: String,
    require: true,
  },
  origin: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
  },
  like: {
    type: [String],
    default: [],
  },
  dislike: {
    type: [String],
    default: [],
  },
  hasNew: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
  },
  subComment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subreview',
  }],
}, { timestamps: true });

reviewSchema.virtual('responseKeys')
  .get(function() {
    const { owner, ...rest } = this._doc;
    return rest;
  })
  .set(function() { return });

reviewSchema.statics.saveWithUpdate = async function(data) {
  const savedReview = await new Review(data).save();
  await ReviewLegend.findOneAndUpdate({
    href: data.href,
    rating: data.rating,
    origin: data.origin,
  }, { $inc: { count: 1 } }, { upsert: true });

  return savedReview;
};

export const Review = mongoose.model('review', reviewSchema);
