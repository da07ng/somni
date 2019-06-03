import Router from 'koa-router';

import userApiv1 from '../api/v1/user';
import articleApiv1 from '../api/v1/article';

function register(app) {
  const router = new Router({
    prefix: '/v1'
  });

  router
    .get(
      '/user',
      app.oauth.authenticate({ scope: 'profile' }),
      userApiv1.getUser
    )
    .get('/users', userApiv1.list)

    .get('/articles', articleApiv1.list)
    .post('/article', articleApiv1.save);

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
