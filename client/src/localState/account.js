const account = {
  defaults: {
    account: {
      __typename: 'Account',
      loggedIn: false,
      user: {
        __typename: 'User',
        id: '1',
        username: 'da07ng'
      }
    }
  },
  resolvers: {}
};

export default account;
