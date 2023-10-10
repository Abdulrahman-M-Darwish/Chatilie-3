import { UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostInput } from './input/create-post.input';
import { IsAuthenticatedGuard } from 'src/auth/guards/isAuthenticated.guard';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdatePostInput } from './input/update-post.input';

@Resolver('Post')
@UseGuards(IsAuthenticatedGuard)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  @Query('posts')
  findAll(@Args('id') id: string, @Context('req') context) {
    return this.postsService.findAll(id == 'me' ? context.user.id : id);
  }
  @Query('post')
  findOne(@Args('id') id: string) {
    return this.postsService.findOne(id);
  }
  @Mutation('createPost')
  create(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context('req') context,
  ) {
    const user = context.user;
    return this.postsService.create(createPostInput, user.id);
  }
  @Mutation('updatePost')
  update(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.update(id, updatePostInput);
  }
  @Mutation('removePost')
  remove(@Args('id') id: string) {
    return this.postsService.remove(id);
  }
}
