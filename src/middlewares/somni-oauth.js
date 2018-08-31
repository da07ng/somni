import OAuth2Server from 'oauth2-server';
const InvalidArgumentError = require('oauth2-server/lib/errors/invalid-argument-error');
const UnauthorizedRequestError = require('oauth2-server/lib/errors/unauthorized-request-error');

const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

class SomniOAuth {
  constructor(options) {
    if (!options.model) {
      throw new InvalidArgumentError('Missing parameter: `model`');
    }
    this.options = options || {};
    this.server = new OAuth2Server(this.options);
  }

  authenticate(options) {
    let that = this;

    return async function (ctx, next) {
      let request = new Request(ctx.request);
      let response = new Response(replaceResponse(ctx.response));
      let token;

      try {
        token = await that.server.authenticate(request, response, options);
        ctx.state.oauth = {
          token: token
        };
      } catch (err) {
        console.log(err);
        handleError.call(that, err, ctx, null, next);
        return;
      }

      await next();
    };
  }

  authorize(options) {
    let that = this;

    return async function (ctx, next) {
      let request = new Request(ctx.request);
      let response = new Response(replaceResponse(ctx.response));
      let code;

      try {
        code = await that.server.authorize(request, response, options);
        ctx.state.oauth = {
          code: code
        };
      } catch (err) {
        handleError.call(that, err, ctx, response, next);
        return;
      }

      if (that.continueMiddleware) {
        await next();
      }

      handleResponse.call(that, ctx, response);
    };
  }

  token(options) {
    let that = this;

    return async function (ctx, next) {
      let request = new Request(ctx.request);
      let response = new Response(replaceResponse(ctx.response));

      let token;

      try {
        token = await that.server.token(request, response, options);
        ctx.state.oauth = {
          token: token
        };
      } catch (err) {
        handleError.call(that, err, ctx, response, next);
        return;
      }

      if (that.continueMiddleware) {
        await next();
      }

      handleResponse.call(that, ctx, response);
    };
  }
}

/**
 * replace response.
 */
function replaceResponse(res) {
  let newResponse = {
    headers: {}
  };
  for (let property in res) {
    if (property !== 'headers') {
      newResponse[property] = res[property];
    }
  }
  for (let field in res.headers) {
    newResponse.headers[field] = res.headers[field];
  }
  newResponse.header = newResponse.headers;
  return newResponse;
}

/**
 * Handle response.
 */
function handleResponse(ctx, response) {
  ctx.body = response.body;
  ctx.status = response.status;

  ctx.set(response.headers);
}

/**
 * Handle error.
 */
function handleError(err, ctx, response, next) {
  if (response) {
    ctx.set(response.headers);
  }

  ctx.status = err.code;

  if (err instanceof UnauthorizedRequestError) {
    ctx.body = 'Unauthorized';
    return;
  }

  ctx.body = {
    error: err.name,
    error_description: err.message
  };
}

export default SomniOAuth;
