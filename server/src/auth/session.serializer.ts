import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, userId: string) => void) {
    done(null, user.id);
  }
  async deserializeUser(
    payload: string,
    done: (err: Error, user: User) => void,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: payload } });
    done(null, user);
  }
}
