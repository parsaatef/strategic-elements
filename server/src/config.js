const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'SEAppUser',
  DB_PASSWORD = 'zaqxswparsa',
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'strategic_elements',

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret!',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = 'redis-18946.c11.us-east-1-3.ec2.cloud.redislabs.com',
  REDIS_PORT = 18946,
  REDIS_PASSWORD = 'Q3sQHdUPmOfMZ1FGnz8IoOBLZcAlJVOt',

  JWT_SECRET = 'fwsdfaswersdrwe',
  JWT_EXPIRE = 60 * 60 * 24 * 30
} = process.env;

const IN_PROD = NODE_ENV === 'production';

export {
  APP_PORT,
  IN_PROD,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  JWT_SECRET,
  JWT_EXPIRE
};
