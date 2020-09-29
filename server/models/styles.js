import mongoose from 'mongoose';

// Example
// {
//   name: { color: '#282828' },
//   date: { color: '#9e9e9e' },
//   description: { color: '#282828', titleColor: '#282828' },
//   rating: { color: '#ff7d02' },
//   comments: { color: '#282828' },
//   like: { color: '#eeeeee' },
//   dislike: { color: '#eeeeee' },
//   mainBlock: { backgroundColor: '#eeeeee' },
//   subCommentBtn: { backgroundColor: '#f5f5f5', color: '#282828' },
//   subComment: { borderColor: '#f5f5f5' }
// }

const stylesSchema = new mongoose.Schema({
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'domain',
  },
  service: String,
  styles: Object,

}, { timestamps: true });

export const Styles = mongoose.model('style', stylesSchema);
