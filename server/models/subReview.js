import mongoose from 'mongoose';
import { Review } from '../models';

const subReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  user: {
    type: {
      name: String,
      email: String,
    },
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
}, { timestamps: true });

subReviewSchema.post('save', async function() {
  await Review.findByIdAndUpdate(this.parentId, { $push: { subComment: this._id } })
});

export const SubReview = mongoose.model('subreview', subReviewSchema);
