import jwt from 'jsonwebtoken';

import config from '../../../config';
import UserModel from '../../models/user.js';

export async function getUser(ctx, next) {
  ctx.body = {
    message: 'Secure data'
  };
}
