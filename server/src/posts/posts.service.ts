import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './input/create-post.input';
import { UpdatePostInput } from './input/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(id: string) {
    return await this.prisma.post.findMany({
      where: id ? { OR: [{ authorId: id }, { author: { name: id } }] } : {},
      include: {
        author: true,
        bookmarks: true,
        commenting: true,
        commenter: true,
        reacts: true,
      },
    });
  }
  async findOne(id: string) {
    return await this.prisma.post.findUnique({ where: { id } });
  }
  async create(createPostInput: CreatePostInput, authorId: string) {
    return await this.prisma.post.create({
      data: { ...createPostInput, authorId },
    });
  }
  async update(id: string, updatePostInput: UpdatePostInput) {
    return await this.prisma.post.update({
      where: { id },
      data: updatePostInput,
      include: {
        author: true,
        bookmarks: true,
        commenting: true,
        commenter: true,
        reacts: true,
      },
    });
  }
  async remove(id: string) {
    return await this.prisma.post.delete({ where: { id } });
  }
}
