import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsAuthenticatedGuard } from 'src/auth/guards/isAuthenticated.guard';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/graphql';

@Resolver('User')
@UseGuards(IsAuthenticatedGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query('users')
  async findAll() {
    return await this.usersService.findAll();
  }
  @Query('user')
  async findOne(@Args('id') id, @Context('req') context) {
    const userId = id === 'me' ? context.user.id : id;
    return await this.usersService.findOne(userId);
  }
  @Mutation('updateUser')
  async update(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context('req') context,
  ) {
    return await this.usersService.update(context.user.id, updateUserInput);
  }
  @Mutation('removeUser')
  async remove(@Args('id') id: string) {
    return await this.usersService.remove(id);
  }
}
