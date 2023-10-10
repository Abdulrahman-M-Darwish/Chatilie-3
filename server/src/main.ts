import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.use(json({ limit: '50mb' }));
  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  redisClient.connect().catch(console.error);
  // Initialize store.
  const redisStore = new RedisStore({
    prefix: 'USER_SESSION:',
    client: redisClient,
  });
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(cookieParser());
  app.use(
    session({
      name: 'USER_SESSION',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: false,
        sameSite: true,
      },
      store: redisStore,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(8080);
}
bootstrap();
