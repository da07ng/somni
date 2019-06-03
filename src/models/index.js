import User from './user';
import Client from './oauth/client';
import AccessToken from './oauth/access-token';
import AuthorizationCode from './oauth/authorization-code';
import RefreshToken from './oauth/refresh-token';
import Scope from './oauth/scope';
import Article from './article';
import Reply from './reply';
import Comment from './comment';

User.sync();
Client.sync();
AccessToken.sync();
AuthorizationCode.sync();
RefreshToken.sync();
Scope.sync();
Article.sync();
Reply.sync();
Comment.sync();

const models = {
  User,
  Client,
  AccessToken,
  AuthorizationCode,
  RefreshToken,
  Scope,
  Article,
  Reply,
  Comment
};

export default models;
