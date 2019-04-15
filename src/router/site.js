import Router from 'koa-router';

import userController from '../controllers/user';
import appController from '../controllers/application';

function register(app) {
  const router = new Router();

  router
    .post('/signup', userController.signup)
    .post('/signin', userController.signin)
    .post('/signout', userController.signout)

    .get('/client', appController.getClient)
    .post('/client', appController.createClient);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
