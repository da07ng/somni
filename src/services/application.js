import crypto from 'crypto'
import { Client } from '../models';

export async function createClient(ctx, next) {
  const client = new Client(ctx.request.body);
  client.client_id = crypto
    .createHash('md5')
    .update(crypto.randomBytes(16))
    .digest('hex'); // 32 chars
  client.client_secret = crypto
    .createHash('sha256')
    .update(crypto.randomBytes(32))
    .digest('hex'); // 64 chars
  client.scope = 'profile';

  await client.save();
  ctx.body = {
    id: client
  };
}

export async function getClient(ctx, next) {
  const client = await Client.findOne({ name: ctx.request.name });
  ctx.body = client;
}
