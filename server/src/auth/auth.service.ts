import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { LoginInput } from './input/signIn.dto';
import { SignupInput } from './input/signup.dto';
import { UsersService } from 'src/users/users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async login({ email, password }: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const isMatch = await argon.verify(user.password, password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    return user;
  }
  async signup(signupInput: SignupInput) {
    const password = await argon.hash(signupInput.password);
    const user = await this.user.create({ ...signupInput, password });
    this.eventEmitter.emit('user.created', user.id);
    return user;
  }
}
