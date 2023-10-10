import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FollowersModule } from './followers/followers.module';
import { MessagesModule } from './messages/messages.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DateTimeISOResolver } from 'graphql-scalars';
import { ProfilesModule } from './profiles/profiles.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Context } from 'graphql-ws';
import { PubSub } from 'graphql-subscriptions';
import { PubSubModule } from './pubsub/pubsub.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    PrismaModule,
    MessagesModule,
    CommentsModule,
    ProfilesModule,
    FollowersModule,
    CloudinaryModule,
    EventEmitterModule.forRoot(),
    PubSubModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.{graphql,gql}'],
      resolvers: { Date: DateTimeISOResolver },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: false,
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: Context<any>) => {
            const { connectionParams, extra } = context;
            extra['user'] = connectionParams.user;
          },
        },
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'interface',
      },
    }),
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
