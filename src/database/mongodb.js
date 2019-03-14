import mongoose from 'mongoose';

import config from '../../config';
import logger from '../utils/logger';

mongoose.Promise = global.Promise;

const connectToMongoDB = async () => {
  let host = config.mongodb.host;
  let port = config.mongodb.port;
  let name = config.mongodb.name;

  try {
    await mongoose.connect(`mongodb://${host}:${port}/${name}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      poolSize: 20
    });

    logger.info('connect to %s success', `mongodb://${host}:${port}/${name}`);
  } catch (err) {
    logger.error(
      'connect to %s error: ',
      `mongodb://${host}:${port}/${name}`,
      err.message
    );
    process.exit(1);
  }
};

export { connectToMongoDB };
