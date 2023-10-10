import { Inject, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageInput } from './input/create-message.input';
import { UpdateMessageInput } from './input/update-message.input';
import { User } from '@prisma/client';
import { IsAuthenticatedGuard } from 'src/auth/guards/isAuthenticated.guard';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

@Resolver('Message')
@UseGuards(IsAuthenticatedGuard)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}
  @Query('messages')
  findAll(@Args('followId') followId: string, @Context('req') req) {
    return this.messagesService.findAll(req.user.id, followId);
  }
  @Query('message')
  findOne(@Args('id') id: string) {
    return this.messagesService.findOne(id);
  }
  @Mutation('createMessage')
  create(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @Context('req') req,
  ) {
    const user = req.user as User;
    return this.messagesService.create(createMessageInput, user.id);
  }
  @Mutation('updateMessage')
  update(
    @Args('id') id: string,
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messagesService.update(id, updateMessageInput);
  }
  @Mutation('removeMessage')
  remove(@Args('id') id: string) {
    return this.messagesService.remove(id);
  }
  @Subscription('messageCreated')
  messageCreated() {
    return this.pubSub.asyncIterator('messageCreated');
  }
}
