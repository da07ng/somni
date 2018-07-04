import jwt from 'jsonwebtoken';

import config from '../../config';
import { User } from '../models';

export async function getUser(ctx, next) {
  ctx.body = {
    message: 'Secure data'
  };
}
