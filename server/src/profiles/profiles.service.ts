import { Injectable } from '@nestjs/common';
import { UpdateProfileInput } from './dto/update-profile.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  @OnEvent('user.created')
  async create(userId: string) {
    return await this.prisma.profile.create({
      data: { userId },
      include: {
        user: true,
      },
    });
  }
  async findOne(userId: string) {
    return await this.prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
  }
  async update(userId: string, updateProfileInput: UpdateProfileInput) {
    return await this.prisma.profile.update({
      where: { userId },
      data: updateProfileInput,
      include: { user: true },
    });
  }
  async remove(userId: string) {
    return await this.prisma.profile.delete({
      where: { userId },
      include: { user: true },
    });
  }
}
