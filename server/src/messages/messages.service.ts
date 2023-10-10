import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageInput } from './input/create-message.input';
import { UpdateMessageInput } from './input/update-message.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';
import { FollowersService } from 'src/followers/followers.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly followers: FollowersService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}
  async findAll(myId: string, userId: string) {
    return await this.prisma.message.findMany({
      orderBy: [{ createdAt: 'asc' }],
      where: {
        OR: [
          { followsFollowerId: myId, followsFollowingId: userId },
          { followsFollowerId: userId, followsFollowingId: myId },
        ],
      },
      include: { author: true, follows: true, group: true },
    });
  }
  async findOne(id: string) {
    return await this.prisma.message.findUnique({ where: { id } });
  }
  async create(createMessageInput: CreateMessageInput, authorId: string) {
    const { followerId, followingId } = await this.followers.findOne(
      authorId,
      createMessageInput.followsFollowingId,
    );
    const message = await this.prisma.message.create({
      data: {
        authorId,
        ...createMessageInput,
        followsFollowerId: followerId,
        followsFollowingId: followingId,
      },
      include: { author: true, follows: true },
    });
    await this.pubSub.publish('messageCreated', {
      messageCreated: message,
    });
    return message;
  }
  async update(id: string, updateMessageInput: UpdateMessageInput) {
    return await this.prisma.message.update({
      where: { id },
      data: updateMessageInput,
    });
  }
  async remove(id: string) {
    return await this.prisma.message.delete({ where: { id } });
  }
}
