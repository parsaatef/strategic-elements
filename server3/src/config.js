export const {
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
  REDIS_PASSWORD = 'Q3sQHdUPmOfMZ1FGnz8IoOBLZcAlJVOt' 
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
