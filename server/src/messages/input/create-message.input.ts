import { IsOptional, IsString } from 'class-validator';

export class CreateMessageInput {
  @IsString()
  @IsOptional()
  text: string;
  @IsString()
  @IsOptional()
  media: string;
  @IsString()
  @IsOptional()
  followsFollowerId: string;
  @IsString()
  @IsOptional()
  followsFollowingId: string;
}
