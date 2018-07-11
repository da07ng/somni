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
      let response = new Response(ctx.response);
      let token;

      try {
        token = await that.server.authenticate(request, response, options);
        ctx.state.oauth = {
          token: token
        };
      } catch (e) {
        await handleError.call(that, e, ctx, null, next);
        return;
      }

      await next();
    };
  }

  authorize(options) {
    let that = this;

    return async function (ctx, next) {
      let request = new Request(ctx.request);
      let response = new Response(ctx.request);
      let code;

      try {
        code = await that.server.authorize(request, response, options);
        ctx.state.oauth = {
          code: code
        };
      } catch (e) {
        await handleError.call(that, e, ctx, response, next);
        return;
      }

      if (that.continueMiddleware) {
        await next();
      }

      await handleResponse.call(that, ctx, response);
    };
  }

  token(options) {
    let that = this;

    return async function (ctx, next) {
      let request = new Request(ctx.request);
      // let response = new Response(ctx.response);
      let newResponse = {
        headers: {},
      };
      let res = ctx.response;
      for (let property in res) {
        if (property !== 'headers') {
          newResponse[property] = res[property];
        }
      }
      for (let field in res.headers) {
        newResponse.headers[field] = res.headers[field];
      }
      newResponse.header = newResponse.headers;
      let response = new Response(newResponse);

      let token;

      try {
        token = await that.server.token(request, response, options);
        ctx.state.oauth = {
          token: token
        };
      } catch (e) {
        await handleError.call(that, e, ctx, response, next);
        return;
      }

      if (that.continueMiddleware) {
        await next();
      }

      await handleResponse.call(that, ctx, response);
    };
  }
}

/**
 * Handle response.
 */
let handleResponse = async function (ctx, response) {
  if (response.status === 302) {
    let location = response.headers.location;
    delete response.headers.location;
    ctx.set(response.headers);
    ctx.redirect(location);
  } else {
    ctx.set(response.headers);
    ctx.status = response.status;
    ctx.body = response.body;
  }
};

/**
 * Handle error.
 */
let handleError = async function (e, ctx, response, next) {
  if (this.useErrorHandler === true) {
    ctx.state.oauth = {
      error: e
    };
    await next();
  } else {
    if (response) {
      ctx.set(response.headers);
    }

    ctx.status = e.code;

    if (e instanceof UnauthorizedRequestError) {
      ctx.body = "";
      return;
    }

    ctx.body = {
      error: e.name,
      error_description: e.message
    };
  }
};

export default SomniOAuth;
