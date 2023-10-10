import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginInput {
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
