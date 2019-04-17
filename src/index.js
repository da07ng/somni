import 'babel-polyfill';

import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import views from 'koa-views';
import path from 'path';

import config from '../config';

import SomniOAuth from './middlewares/somni-oauth';
import * as OAuthModel from './services/oauth';

import { ApolloServer } from 'apollo-server-koa';
import schema from './graphql/schema';

import oauthRegister from './router/oauth';
import siteRegister from './router/site';
import apiRegister from './router/api';

const app = new Koa();
app.keys = ['some secret hurr'];

app.use(cors());
app.use(bodyParser());
app.use(session(app));
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
);

app.oauth = new SomniOAuth({
  model: OAuthModel,
  allowBearerTokensInQueryString: true,
  allowEmptyState: true,
  authorizationCodeLifetime: 60 * 60 * 1,
  accessTokenLifetime: 60 * 60 * 24 * 7,
  refreshTokenLifetime: 60 * 60 * 24 * 7 * 4,
  allowExtendedTokenAttributes: true
});

oauthRegister(app);
siteRegister(app);
apiRegister(app);

const server = new ApolloServer({
  ...schema,
  context: ({ ctx, next }) => ({
    token: ctx.request.headers['authorization']
  })
});

server.applyMiddleware({ app });

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
