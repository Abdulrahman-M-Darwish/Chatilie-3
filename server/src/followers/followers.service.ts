import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async findAll(userId: string) {
    return await this.prisma.follows.findMany({
      where: { OR: [{ followerId: userId }, { followingId: userId }] },
      include: {
        follower: true,
        following: true,
        messages: true,
      },
    });
  }
  async findOne(userId: string, contactId: string) {
    return await this.prisma.follows.findFirst({
      where: {
        AND: [
          { OR: [{ followerId: userId }, { followingId: userId }] },
          { OR: [{ followerId: contactId }, { followingId: contactId }] },
        ],
      },
      include: {
        follower: true,
        following: true,
        messages: { include: { author: true } },
      },
    });
  }
  async create(followerId: string, followingId: string) {
    this.eventEmitter.emit('friendship.created', followerId, followingId);
    return await this.prisma.follows.create({
      data: { followerId, followingId },
      include: {
        follower: true,
        following: true,
      },
    });
  }
  async remove(userId: string, contactId: string) {
    const { followerId, followingId } = await this.findOne(userId, contactId);
    this.eventEmitter.emit('friendship.deleted', followerId, followingId);
    return await this.prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }
}
