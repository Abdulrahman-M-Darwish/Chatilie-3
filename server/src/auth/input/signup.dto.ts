import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;
  @IsStrongPassword()
  password: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  birthDate: Date;
  @IsUrl()
  @IsNotEmpty()
  avatar: string;
}
