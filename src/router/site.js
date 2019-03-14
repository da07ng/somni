import Router from 'koa-router';

import * as accountController from '../controllers/account';
import * as applicationController from '../controllers/application';

function register(app) {
  const router = new Router();

  router
    .post('/signup', accountController.signup)
    .post('/signin', accountController.signin)
    .post('/signout', accountController.signout)

    .get('/client', applicationController.getClient)
    .post('/client', applicationController.createClient);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
