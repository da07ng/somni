import Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import * as accountController from '../controllers/account';
import * as applicationController from '../controllers/application';
import * as infoController from '../controllers/info';
import * as studentController from '../controllers/student';

import schema from '../graphql/schema';

function register(app) {
  const router = new Router();

  router
    .post('/register', accountController.register)
    .post('/signin', accountController.signin)
    .post('/signout', accountController.signout)
    .get('/client', applicationController.getClient)
    .post('/client', applicationController.createClient)

    .post('/saveinfo', infoController.saveInfo)
    .get('/info', infoController.fetchInfo)

    .post('/savestudent', studentController.saveStudent)
    .get('/student', studentController.fetchStudent)
    .get('/studentDetail', studentController.fetchStudentDetail)

    .get('/graphiql', graphiqlKoa({
        endpointURL: '/graphql'
      })
    )
    .get('/graphql', graphqlKoa({
        schema: schema
      })
    )
    .post('/graphql', graphqlKoa({
        schema: schema
      })
    );

  app.use(router.routes());
  app.use(router.allowedMethods());
}

export default register;
