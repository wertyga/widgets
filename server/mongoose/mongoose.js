import mongoose from 'mongoose';
import { config } from '../config';
// mongoose.set('debug', true);
mongoose.Promise = require('bluebird');
mongoose.set('useCreateIndex', true);

const mongooseProps = {
  useMongoClient: true,
};

mongoose.connect(config.mongoose.uri, mongooseProps, async (err) => {
  if(err) {
    console.error(err.message);
  } else {
    console.log('-- Mongoose connect --');
  };
}), config.mongoose.options;


export default mongoose;
