import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';
import { SignupInput } from 'src/graphql';

export class CreateUserInput implements SignupInput {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsUrl()
  @IsNotEmpty()
  avatar: string;
  @IsStrongPassword()
  password: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  birthDate: Date;
  @IsString()
  @IsNotEmpty()
  username: string;
}
