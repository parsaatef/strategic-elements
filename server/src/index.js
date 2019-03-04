/* eslint-disable radix */
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';
import {
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
  JWT_SECRET
} from './config';

(async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      { useNewUrlParser: true }
    );

    const app = express();

    app.disable('x-powered-by');

    const corsOptions = {
      origin: 'http://localhost',
      credentials: true
    };

    app.use(cors(corsOptions));

    const RedisStore = connectRedis(session);

    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD
    });

    // TODO: we should remove session and use from redis with JWT
    app.use(
      session({
        store,
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
          maxAge: parseInt(SESS_LIFETIME),
          sameSite: true,
          secure: IN_PROD
        }
      })
    );

    app.use(async (req, res, next) => {
      const token = req.headers.authorization;

      if (token !== 'null' && token) {
        try {
          const currentUser = await jwt.verify(token, JWT_SECRET);
          req.currentUser = currentUser;
        } catch (err) {
          console.log(err);
          res.status(401);
          res.set({ 'WWW-Authenticate': 'Basic realm="401"' });
        }
      }

      console.log('token');
      console.log(token);
      next();
    });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD
        ? false
        : {
            settings: {
              'request.credentials': 'include'
            }
          },
      context: ({ req, res }) => ({ req, res })
    });

    server.applyMiddleware({ app, cors: false });

    app.listen({ port: APP_PORT }, () =>
      console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
    );
  } catch (e) {
    console.error(e);
  }
})();
