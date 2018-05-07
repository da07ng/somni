import jwt from 'jsonwebtoken';

import config from '../../../config';
import User from '../../models/user.js';

export async function getUser(ctx, next) {
  ctx.body = {
    message: 'Secure data'
  };
}
