import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './input/create-comment.dto';

@Resolver('Comment')
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}
  @Query('comments')
  findAll(@Args('postId') postId: string) {
    return this.commentsService.findAll(postId);
  }
  @Query('comment')
  findOne(@Args('commentId') commentId: string) {
    return this.commentsService.findOne(commentId);
  }
  @Mutation('createComment')
  create(
    @Args('postId') postId: string,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(postId, createCommentInput);
  }
  @Mutation('removeComment')
  remove(@Args('commentId') commentId: string) {
    return this.commentsService.remove(commentId);
  }
}
