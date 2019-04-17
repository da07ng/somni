import Sequelize from 'sequelize';

import config from '../../config';
// import logger from '../utils/logger';

let host = config.postgresql.host;
let port = config.postgresql.port;
let dbname = config.postgresql.dbname;
let username = config.postgresql.username;
let password = config.postgresql.password;

const sequelize = new Sequelize(dbname, username, password, {
  dialect: 'postgres',
  host: host,
  port: port,
  define: {
    underscored: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;
