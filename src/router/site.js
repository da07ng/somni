import Router from 'koa-router';

import user from '../controllers/user';
import application from '../controllers/application';

function register(app) {
  const router = new Router();

  router
    .post('/signup', user.signup)
    .post('/signin', user.signin)
    .post('/signout', user.signout)

    .get('/client', application.getClient)
    .post('/client', application.createClient);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
