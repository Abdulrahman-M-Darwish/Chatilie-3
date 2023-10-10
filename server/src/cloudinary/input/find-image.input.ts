import { IsNotEmpty, IsString } from 'class-validator';

export class FindImageInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
