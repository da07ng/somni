import UserModel from '../models/user.js';

export async function register(ctx, next) {
  const user = new UserModel(ctx.request.body);

  try {
    await user.save();
    ctx.body = {
      id: user._id
    };
  } catch (err) {
    console.log('register - Err: ', err);
  }
}

export async function signin(ctx, next) {
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  let callbackUri = ctx.request.body.callback_uri;

  let user = await UserModel.findByUsername(username);
  if (user) {
    if (await UserModel.checkPassword(password, user.password)) {
      ctx.session.loginUser = {
        userid: user._id,
        username: username
      };

      ctx.redirect(callbackUri);
    } else {
      ctx.render('signin', {
        loginUrl: '/signin',
        callbackUri: callbackUri
      });
    }
  } else {
    ctx.render('signin', {
      loginUrl: '/signin',
      callbackUri: callbackUri
    });
  }
}

export async function signout(ctx, next) {
  ctx.body = {
    message: 'sign out'
  };
}
