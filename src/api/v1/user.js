// import jwt from 'jsonwebtoken';

// import config from '../../config';
// import User from '../../models/user.js';

// export async function getUser(ctx, next) {
//   ctx.body = {
//     message: 'Secure data'
//   };
// }

import userService from '../../services/user';

class UserApiv1 {
  async list(ctx, next) {
    let result = await userService.list();
    ctx.body = result;
  }

  getUser(ctx, next) {
    ctx.body = {
      message: 'Secure data'
    };
  }
}

export default new UserApiv1();
