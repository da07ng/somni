import User from './user';
import Client from './oauth/client';
import AccessToken from './oauth/access-token';
import AuthorizationCode from './oauth/authorization-code';
import RefreshToken from './oauth/refresh-token';
import Scope from './oauth/scope';

const models = {
  User,
  Client,
  AccessToken,
  AuthorizationCode,
  RefreshToken,
  Scope
};

export default models;
