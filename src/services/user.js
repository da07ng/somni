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
    // user.password = await User.generatePasswordHash(password);

    let result = await User.create(user);

    return result;
  }

  async checkPassword(password, hashPassword) {
    let result = User.checkPassword(password, hashPassword);

    return result;
  }

  async findByUsername(username) {
    let result = await User.findOne({
      where: { username: username }
    });

    return result;
  }

  async findByEmail(email) {
    let result = await User.findOne({
      where: { email: email }
    });

    return result;
  }
}

export default new UserService();
