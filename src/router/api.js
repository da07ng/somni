import Router from 'koa-router';

import * as userController from '../controllers/api/user';
import * as articleController from '../controllers/api/article';

function register(app) {
  const router = new Router({
    prefix: '/api'
  });

  router.get(
    '/user',
    app.oauth.authenticate({ scope: 'profile' }),
    userController.getUser
  );

  // .get('/article', articleController.fetchArticle)
  // .post('/savearticle', articleController.saveArticle);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
