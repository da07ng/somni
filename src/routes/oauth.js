import Router from 'koa-router';

import * as oauthController from '../controllers/oauth';

function register(app) {
  const router = new Router({
    prefix: '/oauth2'
  });

  router
    .get('/authorize', oauthController.checkLogin)
    .get(
      '/authorize',
      app.oauth.authorize({
        authenticateHandler: oauthController.authenticateHandler()
      })
    )
    // .post('/oauth2/authorize', app.oauth.authorize())
    .post('/token', app.oauth.token());

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
