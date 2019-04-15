import jwt from 'jsonwebtoken';

import config from '../../config';

import models from '../models';

const AccessToken = models.AccessToken;
const AuthorizationCode = models.AuthorizationCode;
const Client = models.Client;
const RefreshToken = models.RefreshToken;
const Scope = models.Scope;
const User = models.User;

// import AccessToken from './oauth/access-token';
// import AuthorizationCode from './oauth/authorization-code';
// import Client from './oauth/client';
// import RefreshToken from './oauth/refresh-token';
// import Scope from './oauth/scope';
// import User from './user';

/**
 * Get access token.
 */
async function getAccessToken(token) {
  console.log('getAccessToken', token);

  try {
    let accessToken = await AccessToken.findOne({
      where: { access_token: token },
      attributes: [
        ['access_token', 'accessToken'],
        ['expires', 'accessTokenExpiresAt'],
        'scope'
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        Client
      ]
    });

    console.log('accessToken', accessToken);

    if (!accessToken) {
      return false;
    }

    let tempToken = {
      accessToken: accessToken.access_token,
      accessTokenExpiresAt: accessToken.expires,
      scope: accessToken.scope,
      user_id: accessToken.user,
      client_id: accessToken.client
    };

    return tempToken;
  } catch (err) {
    console.log('getAccessToken - Err: ', err);
  }
}

/**
 * Get refresh token.
 */
async function getRefreshToken(token) {
  console.log('getRefreshToken', token);

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { refresh_token: token },
      attributes: ['client_id', 'user_id', 'expires'],
      include: [User, Client]
    });

    if (!refreshToken) {
      return false;
    }

    let tempToken = {
      refreshTokenExpiresAt: token ? new Date(refreshToken.expires) : null,
      refreshToken: token,
      scope: refreshToken.scope,
      user_id: refreshToken.user,
      client_id: refreshToken.client
    };

    return tempToken;
  } catch (err) {
    console.log('getRefreshToken - Err: ', err);
  }
}

/**
 * Get authorization code.
 */
async function getAuthorizationCode(code) {
  console.log('getAuthorizationCode', code);

  try {
    let authorizationCode = await AuthorizationCode.findOne({
      where: { authorization_code: code },
      attributes: ['client_id', 'expires', 'user_id', 'scope'],
      include: [User, Client]
    });

    if (!authorizationCode) {
      return false;
    }

    let tempCode = {
      code: code,
      expiresAt: authorizationCode.expires,
      redirectUri: authorizationCode.redirect_uri,
      scope: authorizationCode.scope,
      user_id: authorizationCode.User,
      client_id: authorizationCode.Client
    };

    return tempCode;
  } catch (err) {
    console.log('getAuthorizationCode - Err: ', err);
  }
}

/**
 * Get client.
 */
async function getClient(clientId, clientSecret) {
  console.log('getClient', clientId, clientSecret);

  try {
    let options = {
      where: { client_id: clientId },
      attributes: ['id', 'client_id', 'redirect_uri', 'scope']
    };

    if (clientSecret) {
      options.where.client_secret = clientSecret;
    }

    let client = await Client.findOne(options);

    if (!client) {
      return false;
    }

    let tempClient = {
      id: client.id,
      redirectUris: client.redirect_uris,
      grants: client.grant_types
    };

    let clientWithGrants = client.toJSON();
    clientWithGrants.grants = [
      'authorization_code',
      'password',
      'refresh_token',
      'client_credentials'
    ];
    // Todo: need to create another table for redirect URIs
    clientWithGrants.redirectUris = [clientWithGrants.redirect_uri];
    delete clientWithGrants.redirect_uri;
    // clientWithGrants.refreshTokenLifetime = integer optional;
    // clientWithGrants.accessTokenLifetime  = integer optional;
    return clientWithGrants;
  } catch (err) {
    console.log('getClient - Err: ', err);
  }
}

/**
 * Get user.
 */
async function getUser(username, password) {
  try {
    let user = await User.findOne({
      where: { username: username },
      attributes: ['id', 'username', 'password', 'scope']
    });
    if (user) {
      if (await User.checkPassword(password, user.password)) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log('getUser - Err: ', err);
  }
}

/**
 * Get user from client.
 */
async function getUserFromClient(client) {
  console.log('getUserFromClient', client);

  try {
    let options = {
      where: { client_id: client.client_id },
      attributes: ['id', 'client_id', 'redirect_uri'],
      include: [User]
    };
    if (client.client_secret)
      options.where.client_secret = client.client_secret;

    let result = await Client.findOne(options);
    if (!result) {
      return false;
    }

    return result.User;
  } catch (err) {
    console.log('getUserFromClient - Err: ', err);
  }
}

/**
 * Save token.
 */
async function saveToken(token, client, user) {
  console.log('saveToken', token, client, user);

  try {
    let accessToken = await AccessToken.create({
      access_token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      scope: token.scope,
      user_id: user.id,
      client_id: client.id
    });

    if (token.refreshToken) {
      // no refresh token for client_credentials
      let refreshToken = await RefreshToken.create({
        refresh_token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        client_id: client.id,
        user_id: user.id,
        scope: token.scope
      });
    }

    let playload = {
      iss: config.jwt.iss,
      sub: user.id,
      aud: client.id,
      exp: Date.parse(token.accessTokenExpiresAt) / 1000,
      user: {
        id: user.id,
        username: user.username
      }
    };
    let options = {
      algorithm: 'HS256'
    };

    let idToken = jwt.sign(playload, config.jwt.secret, options);

    return Object.assign(
      {
        client,
        user,
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
        id_token: idToken
      },
      token
    );
  } catch (err) {
    console.log('saveToken - Err: ', err);
  }
}

/**
 * Save authorization code.
 */
async function saveAuthorizationCode(code, client, user) {
  console.log('saveAuthorizationCode', code, client, user);

  try {
    let authorizationCode = await AuthorizationCode.create({
      authorization_code: code.authorizationCode,
      expires: code.expiresAt,
      redirect_uri: code.redirectUri,
      scope: code.scope,
      user_id: user.id,
      client_id: client.id
    });

    let tempCode = {
      authorizationCode: code.authorizationCode,
      expires_in: Math.floor((code.expiresAt - new Date()) / 1000),
      redirectUri: code.redirectUri,
      scope: code.scope,
      user_id: user.id,
      client_id: client.id
    };

    return tempCode;
  } catch (err) {
    console.log('saveAuthorizationCode - Err: ', err);
  }
}

/**
 * Revoke token.
 */
async function revokeToken(token) {
  console.log('revokeToken', token);

  try {
    let refreshTokenStatus = await RefreshToken.findOne({
      where: { refresh_token: token.refreshToken }
    });

    return !!refreshTokenStatus;
  } catch (err) {
    console.log('revokeToken - Err: ', err);
  }
}

/**
 * Revoke authorization code.
 */
async function revokeAuthorizationCode(code) {
  console.log('revokeAuthorizationCode', code);

  try {
    let authorizationCodeStatus = await AuthorizationCode.findOne({
      where: {
        authorization_code: code.code
      }
    });

    return !!authorizationCodeStatus;
  } catch (err) {
    console.log('revokeAuthorizationCode - Err: ', err);
  }
}

/**
 * Validate scope.
 */
async function validateScope(user, client, scope) {
  // console.log('validateScope', user, client, scope);
  // return (user.scope === scope && client.scope === scope && scope !== null) ? scope: false;
  return '*';
}

/**
 * Verify scope.
 */
async function verifyScope(accessToken, scope) {
  // console.log('verifyScope', accessToken, scope);
  // return accessToken.scope === scope;
  return true;
}

export {
  AccessToken,
  AuthorizationCode,
  Client,
  RefreshToken,
  Scope,
  // generateAccessToken,
  // generateRefreshToken,
  getAccessToken,
  getRefreshToken,
  getAuthorizationCode,
  getClient,
  getUser,
  getUserFromClient,
  saveToken,
  saveAuthorizationCode,
  revokeToken,
  revokeAuthorizationCode,
  validateScope,
  verifyScope
};
