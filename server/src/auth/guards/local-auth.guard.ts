import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private authService: AuthService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.user = await this.validate(ctx.getArgs().loginInput);
    await super.logIn(request);
    return request;
  }
  private async validate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return await this.authService.login({ email, password });
  }
}
