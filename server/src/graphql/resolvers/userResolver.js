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
    addUser(_, { username, email, password }) {
      const user = new User({ username, email, password });

      return user.save();
    }
  }
};
