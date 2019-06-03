import userService from '../services/user';

class UserController {
  async signup(ctx, next) {
    // const user = new User(ctx.request.body);
    let params = ctx.request.body;

    try {
      let result = await userService.create(params);
      ctx.body = result;
    } catch (err) {
      console.log('signup - Err: ', err);
    }
  }

  async signin(ctx, next) {
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;
    let callbackUri = ctx.request.body.callback_uri;

    let user;
    if (account.indexOf('@') > -1) {
      user = await userService.findByEmail(account);
    } else {
      user = await userService.findByUsername(account);
    }

    if (user) {
      if (await userService.checkPassword(password, user.password)) {
        ctx.session.loginUser = {
          userid: user.id,
          username: account
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

  async signout(ctx, next) {
    ctx.body = {
      message: 'sign out'
    };
  }
}

export default new UserController();

// export async function signup(ctx, next) {
//   // const user = new User(ctx.request.body);
//   let params = ctx.request.body;

//   try {
//     let result = await userService.create(params);
//     ctx.body = {
//       id: result.id
//     };
//   } catch (err) {
//     console.log('signup - Err: ', err);
//   }
// }

// export async function signin(ctx, next) {
//   let account = ctx.request.body.account;
//   let password = ctx.request.body.password;
//   let callbackUri = ctx.request.body.callback_uri;

//   let user;
//   if (account.indexOf('@') > -1) {
//     user = await userService.findByEmail(account);
//   } else {
//     user = await userService.findByUsername(account);
//   }

//   if (user) {
//     if (await userService.checkPassword(password, user.password)) {
//       ctx.session.loginUser = {
//         userid: user.id,
//         username: account
//       };

//       ctx.redirect(callbackUri);
//     } else {
//       ctx.render('signin', {
//         loginUrl: '/signin',
//         callbackUri: callbackUri
//       });
//     }
//   } else {
//     ctx.render('signin', {
//       loginUrl: '/signin',
//       callbackUri: callbackUri
//     });
//   }
// }

// export async function signout(ctx, next) {
//   ctx.body = {
//     message: 'sign out'
//   };
// }

// export async function getUser(ctx, next) {
//   ctx.body = {
//     message: 'Secure data'
//   };
// }
