import Router from 'koa-router';

import user from '../controllers/user';
import application from '../controllers/application';
import oauth from '../controllers/oauth';

function register(app) {
  const router = new Router();

  router
    .post('/signup', user.signup)
    .post('/signin', user.signin)
    .post('/signout', user.signout)

    .get('/client', application.getClient)
    .post('/client', application.createClient)

    .get('/oauth2/authorize', oauth.checkLogin)
    .get(
      '/oauth2/authorize',
      app.oauth.authorize({
        authenticateHandler: oauth.authenticateHandler()
      })
    )
    // .post('/oauth2/authorize', app.oauth.authorize())
    .post('/oauth2/token', app.oauth.token());

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
