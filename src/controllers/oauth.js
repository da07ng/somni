export async function checkLogin(ctx, next) {
  let agree = ctx.query.agree === 'true';
  let deny = ctx.query.deny === 'true';
  let logout = ctx.query.logout === 'true';
  let clientId = ctx.query.client_id;
  let scope = ctx.query.scope;

  let loginUser = ctx.session.loginUser;
  let curRequestUrl = ctx.href.replace(
    /&?(deny|agree|logout|csrfToken)=[^&]+/g,
    ''
  );

  // if (!clientId || !scope) {
  //   return ctx.status = 400;
  // }

  if (!loginUser) {
    await ctx.render('signin', {
      loginUrl: '/signin',
      callbackUri: curRequestUrl
    });

    return;
  }

  if (agree || deny || logout) {
    if (deny) {
      await ctx.render('deny', {
        username: loginUser.username
      });
    } else if (logout) {
      ctx.session.loginUser = null;

      await ctx.render('signin', {
        loginUrl: '/signin',
        callbackUri: curRequestUrl
      });
    } else {
      await next();
    }

    return;
  }

  await ctx.render('confirm', {
    username: loginUser.username,
    callbackUri: curRequestUrl
  });
}

export function authenticateHandler() {
  return {
    handle: function (request, response) {
      // in this example, we store the logged-in user as the 'loginUser' attribute in session
      if (request.ctx.session.loginUser) {
        return {
          _id: request.ctx.session.loginUser.userid,
          username: request.ctx.session.loginUser.username
        };
      }

      return null;
    }
  };
}
