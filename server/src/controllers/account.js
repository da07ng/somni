import { User } from '../models';

export async function signup(ctx, next) {
  const user = new User(ctx.request.body);

  try {
    await user.save();
    ctx.body = {
      id: user._id
    };
  } catch (err) {
    console.log('signup - Err: ', err);
  }
}

export async function signin(ctx, next) {
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  let callbackUri = ctx.request.body.callback_uri;

  let user = await User.findByUsername(username);
  if (user) {
    if (await User.checkPassword(password, user.password)) {
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
