import jwt from 'jsonwebtoken';

import config from '../../config';

import AccessTokenModel from './oauth/access-token';
import AuthorizationCodeModel from './oauth/authorization-code';
import ClientModel from './oauth/client';
import refreshTokenModel from './oauth/refresh-token';
import ScopeModel from './oauth/scope';
import UserModel from './user';

// /**
//  * Generate access token.
//  */
// async function generateAccessToken(client, user, scope) {
//   let token = '';

//   return token;
// }

// /**
//  * Generate refresh token.
//  */
// async function generateRefreshToken(client, user, scope) {
//   let token = '';

//   return token;
// }

/**
 * Get access token.
 */
async function getAccessToken(token) {
  console.log('getAccessToken', token);

  try {
    let accessToken = await AccessTokenModel.findOne({
      access_token: token
    })
      .populate('user')
      .populate('client')
      .lean();
    console.log('at', accessToken);

    if (!accessToken) {
      return false;
    }

    let tempToken = {
      accessToken: accessToken.access_token,
      accessTokenExpiresAt: accessToken.expires,
      scope: accessToken.scope,
      user: accessToken.user,
      client: accessToken.client
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
    let refreshToken = await refreshTokenModel
      .findOne({
        refresh_token: token
      })
      .populate('user')
      .populate('client')
      .lean();

    if (!refreshToken) {
      return false;
    }

    let tempToken = {
      refreshTokenExpiresAt: token ? new Date(refreshToken.expires) : null,
      refreshToken: token,
      scope: refreshToken.scope,
      user: refreshToken.user,
      client: refreshToken.client
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
    let authorizationCode = await AuthorizationCodeModel.findOne({
      authorization_code: code
    })
      .populate('user')
      .populate('client')
      .lean();

    if (!authorizationCode) {
      return false;
    }

    let tempCode = {
      code: authorizationCode.authorization_code,
      expiresAt: authorizationCode.expires,
      redirectUri: authorizationCode.redirect_uri,
      scope: authorizationCode.scope,
      user: authorizationCode.user,
      client: authorizationCode.client
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
    let params = {
      client_id: clientId
    };
    if (clientSecret) {
      params.client_secret = clientSecret;
    }

    let client = await ClientModel.findOne(params).lean();

    if (!client) {
      return false;
    }

    let tempClient = {
      _id: client._id,
      redirectUris: client.redirect_uris,
      grants: client.grant_types
    };

    return tempClient;
  } catch (err) {
    console.log('getClient - Err: ', err);
  }
}

/**
 * Get user.
 */
async function getUser(username, password) {
  try {
    let user = await UserModel.findByUsername(username).lean();
    if (user) {
      if (await UserModel.checkPassword(password, user.password)) {
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
    let user = await UserModel.findById(client.user).lean();

    if (!user) {
      return false;
    }

    return user;
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
    let accessToken = await AccessTokenModel.create({
      access_token: token.accessToken,
      expires: token.accessTokenExpiresAt,
      scope: token.scope,
      user: user._id,
      client: client._id
    });

    if (token.refreshToken) {
      // no refresh token for client_credentials
      let refreshToken = await refreshTokenModel.create({
        refresh_token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        client: client._id,
        user: user._id,
        scope: token.scope
      });
    }

    let playload = {
      iss: config.jwt.iss,
      sub: user._id.toString(),
      aud: client._id.toString(),
      exp: Date.parse(token.accessTokenExpiresAt) / 1000,
      user: {
        id: user._id.toString(),
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
    let authorizationCode = await AuthorizationCodeModel.create({
      authorization_code: code.authorizationCode,
      expires: code.expiresAt,
      redirect_uri: code.redirectUri,
      scope: code.scope,
      user: user._id,
      client: client._id
    });

    let tempCode = {
      authorizationCode: code.authorizationCode,
      expires_in: Math.floor((code.expiresAt - new Date()) / 1000),
      redirectUri: code.redirectUri,
      scope: code.scope,
      user: user._id,
      client: client._id
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
    let refreshTokenStatus = await refreshTokenModel.findOneAndRemove({
      refresh_token: token.refreshToken
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
    let authorizationCodeStatus = await AuthorizationCodeModel.findOneAndRemove(
      {
        authorization_code: code.code
      }
    );

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
  AccessTokenModel,
  AuthorizationCodeModel,
  ClientModel,
  refreshTokenModel,
  ScopeModel,
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
