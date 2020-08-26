import mongoose from 'mongoose';
import { config } from '../config';

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
  allowed: {
    type: Boolean,
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
    return {
      ...rest,
      like: rest.like.length,
      dislike: rest.dislike.length,
      images: rest.images.map(image => `${config.serverAddress}${image}`),
    };
  })
  .set(function() { return });

export const Review = mongoose.model('review', reviewSchema);
