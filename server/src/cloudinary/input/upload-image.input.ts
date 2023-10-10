import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum FileType {
  COVER = 'cover',
  AVATAR = 'avatar',
  POSTS = 'posts',
}

export class UploadImageInput {
  @IsNotEmpty()
  @IsString()
  base64EncodedImage: string;
  @IsEnum(FileType)
  type: string;
}
