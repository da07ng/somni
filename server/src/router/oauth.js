import Router from 'koa-router';

import SomniOAuth from '../middlewares/somni-oauth';
import * as OAuthModel from '../models/oauth';
import * as oauthController from '../controllers/oauth';

function register(app) {
  app.oauth = new SomniOAuth({
    model: OAuthModel,
    allowBearerTokensInQueryString: true,
    allowEmptyState: true,
    authorizationCodeLifetime: 60 * 60 * 1,
    accessTokenLifetime: 60 * 60 * 24 * 7,
    refreshTokenLifetime: 60 * 60 * 24 * 7 * 4,
    allowExtendedTokenAttributes: true
  });

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
