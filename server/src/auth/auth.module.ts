import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, SessionSerializer, AuthResolver],
})
export class AuthModule {}
