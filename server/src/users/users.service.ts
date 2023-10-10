import { ForbiddenException, Injectable } from '@nestjs/common';

import { CreateUserInput } from './input/create-user.input';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserInput } from './input/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ id }, { name: id }] },
      include: {
        bookmarks: true,
        followedBy: true,
        following: true,
        Member: true,
        messages: true,
        notifications: true,
        pages: true,
        posts: true,
        profile: true,
        reacts: true,
      },
    });
    return user;
  }
  async create(createUserInput: CreateUserInput) {
    try {
      const user = await this.prisma.user.create({
        data: { ...createUserInput },
      });
      return user;
    } catch (error: any) {
      if (error.code === 'P2002')
        throw new ForbiddenException(`${error.meta.target} already exists`);
      throw new Error(error.message);
    }
  }
  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserInput,
      });
      return user;
    } catch (error: any) {
      if (error.code === 'P2002')
        throw new ForbiddenException(error.meta.target + ' already exists');
      throw new Error(error.message);
    }
  }
  async remove(id: string) {
    const user = await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
