import { User } from '../../models';

export default {
  Query: {
    users: () => {
      return User.find({});
    },
    user: (obj, args, context, info) => {
      return User.findOne({ _id: args.id });
    }
  },
  Mutation: {
    async signup(_, { username, email, password }, context, info) {
      const user = new User({ username, email, password });

      try {
        let newUser = await user.save();

        return {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        };
      } catch (error) {
        if (error.code === 11000) {
          throw new Error('Duplicate key');
        } else {
          throw new Error(error.errmsg);
        }
      }
    },
    async signin(_, { account, password }, context, info) {
      console.log(context);
      let user;
      if (account.indexOf('@') > -1) {
        user = await User.findByEmail(account);
      } else {
        user = await User.findByUsername(account);
      }

      if (user) {
        if (await User.checkPassword(password, user.password)) {
          return user;
        } else {
          throw new Error('error password');
        }
      } else {
        throw new Error('error account');
      }
    }
  }
};
