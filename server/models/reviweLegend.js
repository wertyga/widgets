import mongoose from 'mongoose';

const reviewLegendSchema = new mongoose.Schema({
  rating: {
    type: Number,
    require: true,
  },
  count: {
    type: Number,
    require: true,
    default: 0,
  },
  href: {
    type: String,
    require: true,
  },
  origin: {
    type: String,
    require: true,
  },
}, { timestamps: true });

reviewLegendSchema.statics.findRating = async function(href, rating) {
  const reqObj = !rating ? { href } : { href, rating };
  const legends = await ReviewLegend.find(reqObj);

  return legends.reduce((init, { count, rating }) => ({
    ...init,
    [rating]: (init[rating] || 0) + count,
  }), {})
};

export const ReviewLegend = mongoose.model('review-legend', reviewLegendSchema);
