import Router from 'koa-router';
// import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import * as accountController from '../controllers/account';
import * as applicationController from '../controllers/application';

// import schema from '../graphql/schema';

function register(app) {
  const router = new Router();

  router
    .post('/signup', accountController.signup)
    .post('/signin', accountController.signin)
    .post('/signout', accountController.signout)

    .get('/client', applicationController.getClient)
    .post('/client', applicationController.createClient);

  // .get(
  //   '/graphiql',
  //   graphiqlKoa({
  //     endpointURL: '/graphql'
  //   })
  // )
  // .get('/graphql', graphqlKoa({
  //     schema: schema
  //   })
  // )
  // .post('/graphql', graphqlKoa((ctx, next) => ({
  //     schema: schema,
  //     context: {
  //       token: ctx.request.headers['authorization']
  //     }
  //   }))
  // );

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
