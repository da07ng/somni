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
async function getAccessToken(accessToken) {
  try {
    let result = await AccessToken.findOne({
      where: { access_token: accessToken },
      attributes: ['access_token', 'expires', 'scope'],
      include: [User, Client]
    });

    if (!result) {
      return false;
    }

    let data = {
      accessToken: result.access_token,
      accessTokenExpiresAt: result.expires,
      scope: result.scope,
      client: result.Client,
      user: result.User
    };

    return data;
  } catch (err) {
    console.log('getAccessToken - Err: ', err);
  }
}

/**
 * Get refresh token.
 */
async function getRefreshToken(refreshToken) {
  try {
    let result = await RefreshToken.findOne({
      where: { refresh_token: refreshToken },
      attributes: ['expires', 'scope'],
      include: [User, Client]
    });

    if (!result) {
      return false;
    }

    let data = {
      refreshToken: refreshToken,
      refreshTokenExpiresAt: refreshToken ? new Date(result.expires) : null,
      scope: result.scope,
      client: result.Client,
      user: result.User
    };

    return data;
  } catch (err) {
    console.log('getRefreshToken - Err: ', err);
  }
}

/**
 * Get authorization code.
 */
async function getAuthorizationCode(authorizationCode) {
  try {
    let result = await AuthorizationCode.findOne({
      where: { authorization_code: authorizationCode },
      attributes: ['expires', 'redirect_uri', 'scope'],
      include: [User, Client]
    });

    if (!result) {
      return false;
    }

    let data = {
      authorizationCode: authorizationCode,
      expiresAt: result.expires,
      redirectUri: result.redirect_uri,
      scope: result.scope,
      client: result.Client,
      user: result.User
    };

    return data;
  } catch (err) {
    console.log('getAuthorizationCode - Err: ', err);
  }
}

/**
 * Get client.
 */
async function getClient(clientId, clientSecret) {
  try {
    let options = {
      where: { client_id: clientId },
      attributes: ['id', 'redirect_uri', 'grant_types', 'scope', 'client_id']
    };

    if (clientSecret) {
      options.where.client_secret = clientSecret;
    }

    let result = await Client.findOne(options);

    if (!result) {
      return false;
    }

    let data = {
      id: result.id,
      redirectUris: [result.redirect_uri],
      grants: [
        'authorization_code',
        'password',
        'refresh_token',
        'client_credentials'
      ]
    };

    return data;
  } catch (err) {
    console.log('getClient - Err: ', err);
  }
}

/**
 * Get user.
 */
async function getUser(username, password) {
  try {
    let result = await User.findOne({
      where: { username: username },
      attributes: ['id', 'username', 'password', 'scope']
    });

    if (result) {
      if (await User.checkPassword(password, result.password)) {
        return result;
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
  try {
    let options = {
      where: { client_id: client.client_id },
      attributes: ['id'],
      include: [User]
    };
    if (client.client_secret) {
      options.where.client_secret = client.client_secret;
    }

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
  try {
    let accessTokenResult = await AccessToken.create({
      access_token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      scope: token.scope,
      client_id: client.id,
      user_id: user.id
    });

    if (!accessTokenResult) {
      return false;
    }

    if (token.refreshToken) {
      // no refresh token for client_credentials
      let refreshTokenResult = await RefreshToken.create({
        refresh_token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        scope: token.scope,
        client_id: client.id,
        user_id: user.id
      });

      if (!refreshTokenResult) {
        return false;
      }
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

    let data = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      id_token: idToken,
      scope: token.scope,
      client: client,
      user: user
    };

    return data;
  } catch (err) {
    console.log('saveToken - Err: ', err);
  }
}

/**
 * Save authorization code.
 */
async function saveAuthorizationCode(code, client, user) {
  try {
    let authorizationCode = await AuthorizationCode.create({
      authorization_code: code.authorizationCode,
      expires: code.expiresAt,
      redirect_uri: code.redirectUri,
      scope: code.scope,
      client_id: client.id,
      user_id: user.id
    });

    if (!authorizationCode) {
      return false;
    }

    let data = {
      authorizationCode: code.authorizationCode,
      expires_in: Math.floor((code.expiresAt - new Date()) / 1000),
      redirectUri: code.redirectUri,
      scope: code.scope,
      client_id: client.id,
      user_id: user.id
    };

    return data;
  } catch (err) {
    console.log('saveAuthorizationCode - Err: ', err);
  }
}

/**
 * Revoke token.
 */
async function revokeToken(token) {
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { refresh_token: token.refreshToken }
    });

    if (refreshToken) {
      return refreshToken.destroy();
    }

    return false;
  } catch (err) {
    console.log('revokeToken - Err: ', err);
  }
}

/**
 * Revoke authorization code.
 */
async function revokeAuthorizationCode(code) {
  try {
    let authorizationCode = await AuthorizationCode.findOne({
      where: { authorization_code: code.authorizationCode }
    });

    if (authorizationCode) {
      return authorizationCode.destroy();
    }

    return false;
  } catch (err) {
    console.log('revokeAuthorizationCode - Err: ', err);
  }
}

/**
 * Validate scope.
 */
async function validateScope(user, client, scope) {
  let requestedScopes = scope.split(',');
  let result = await Scope.findAll({
    attributes: ['scope']
  });

  let validateScopes = [];
  for (const item of result) {
    validateScopes.push(item.scope);
  }

  if (!requestedScopes.every(s => validateScopes.indexOf(s) >= 0)) {
    return false;
  }

  return scope;
}

/**
 * Verify scope.
 */
async function verifyScope(accessToken, scope) {
  if (!accessToken.scope) {
    return false;
  }

  let requestedScopes = scope.split(' ');
  let authorizedScopes = accessToken.scope.split(' ');

  return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0);
}

export {
  // AccessToken,
  // AuthorizationCode,
  // Client,
  // RefreshToken,
  // Scope,
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
