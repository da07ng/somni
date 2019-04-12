import models from '../models';

const User = models.User;

class UserService {
  async create(params) {
    const { username, email, password } = params;

    // let user = await User.getUserByName(username);

    let user = {
      username,
      email,
      password
    };
    user.password = await User.generatePasswordHash(password);

    let result = await User.create(user);

    return result;
  }
}

export default new UserService();
