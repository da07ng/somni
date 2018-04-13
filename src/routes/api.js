import Router from 'koa-router';

import * as userController from '../controllers/api/user';

function register(app) {
  const router = new Router({
    prefix: '/api'
  });

  router.get('/user', app.oauth.authenticate(), userController.getUser);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
