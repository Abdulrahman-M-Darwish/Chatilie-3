import { Privacy } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  @IsOptional()
  text: string;
  @IsArray()
  @IsOptional()
  imagesSrc: string[];
  @IsEnum(Privacy)
  @IsOptional()
  privacy?: Privacy;
}
