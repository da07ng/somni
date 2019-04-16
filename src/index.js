import 'babel-polyfill';

import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import views from 'koa-views';
import path from 'path';

import { ApolloServer } from 'apollo-server-koa';
import schema from './graphql/schema';

import config from '../config';

import oauthRegister from './router/oauth';
import siteRegister from './router/site';
// import apiRegister from './router/api';

import sequelize from './database/postgresql';

// connectToMongoDB();

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

oauthRegister(app);
siteRegister(app);
// apiRegister(app);

// sequelize.sync({force: true});
sequelize.sync();

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
