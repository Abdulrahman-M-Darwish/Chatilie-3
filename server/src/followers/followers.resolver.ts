import { UseGuards } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { IsAuthenticatedGuard } from 'src/auth/guards/isAuthenticated.guard';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('Follows')
@UseGuards(IsAuthenticatedGuard)
export class FollowersResolver {
  constructor(private readonly followersService: FollowersService) {}
  @Query('followers')
  findAll(@Args('id') id: string, @Context('req') context) {
    const userId = id == 'me' ? context.user.id : id;
    return this.followersService.findAll(userId);
  }
  @Query('follower')
  findOne(@Args('followerId') id: string, @Context('req') context) {
    const user = context.user;
    return this.followersService.findOne(user.id, id);
  }
  @Mutation('createFollower')
  create(@Args('followingId') followingId, @Context('req') context) {
    const user = context.user;
    return this.followersService.create(user.id, followingId);
  }
  @Mutation('removeFollower')
  remove(@Args('followerId') followerId: string, @Context('req') context) {
    const user = context.user;
    return this.followersService.remove(user.id, followerId);
  }
}
