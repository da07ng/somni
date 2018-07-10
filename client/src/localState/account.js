const account = {
  defaults: {
    account: {
      __typename: 'Account',
      loggedIn: false,
      user: {
        __typename: 'User',
        id: '',
        username: ''
      }
    }
  },
  resolvers: {}
};

export default account;
