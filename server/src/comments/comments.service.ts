import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './input/create-comment.dto';
import { UpdateCommentInput } from './input/update-comment.dto';

@Injectable()
export class CommentsService {
  async findAll(postId: string) {
    return;
  }
  async findOne(commentId: string) {
    return;
  }
  async create(postId: string, createCommentInput: CreateCommentInput) {
    return;
  }
  async update(commentId: string, updateCommentInput: UpdateCommentInput) {
    return;
  }
  async remove(commentId: string) {
    return;
  }
}
