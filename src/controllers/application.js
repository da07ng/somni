import applicationService from '../services/application';

class AppController {
  async createClient(ctx, next) {
    let params = ctx.request.body;

    try {
      let result = await applicationService.create(params);
      ctx.body = {
        id: result.id
      };
    } catch (err) {
      console.log('signup - Err: ', err);
    }
  }

  async getClient(ctx, next) {
    // const client = await Client.findOne({ name: ctx.request.name });
    // ctx.body = client;
  }
}

export default new AppController();
