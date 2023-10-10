import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { FollowersModule } from 'src/followers/followers.module';

@Module({
  providers: [MessagesService, MessagesResolver],
  imports: [FollowersModule],
})
export class MessagesModule {}
