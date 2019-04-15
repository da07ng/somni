import User from './user';
import AccessToken from './oauth/access-token';
import AuthorizationCode from './oauth/authorization-code';
import Client from './oauth/client';
import RefreshToken from './oauth/refresh-token';
import Scope from './oauth/scope';

const models = {
  User,
  AccessToken,
  AuthorizationCode,
  Client,
  RefreshToken,
  Scope
};

export default models;
