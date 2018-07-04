import log4js from 'log4js';

log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'logs/cheese.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});

const logger = log4js.getLogger('normal');

export default logger;
