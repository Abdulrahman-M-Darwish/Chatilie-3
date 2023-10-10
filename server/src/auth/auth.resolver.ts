import {
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignupInput } from './input/signup.dto';
import { IsAuthenticatedGuard } from './guards/isAuthenticated.guard';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

@Resolver('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation('login')
  @UseGuards(LocalAuthGuard)
  async login(@Context('req') context) {
    return context.user;
  }
  @Mutation('signup')
  async signup(
    @Args('signupInput') signupInput: SignupInput,
    @Context() context,
  ) {
    const user = await this.authService.signup(signupInput);
    context.req.session.passport = { user: user.id };
    return user;
  }
  @UseGuards(IsAuthenticatedGuard)
  @Mutation('logout')
  async logout(@Context('req') context) {
    const logoutError = await new Promise((resolve) =>
      context.logOut({ keepSessionInfo: false }, (error) => resolve(error)),
    );
    if (logoutError) {
      throw new InternalServerErrorException('Could not log out user');
    }
  }
}
