import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { FileType } from './upload-image.input';

export class UploadImagesInput {
  @IsNotEmpty()
  @IsArray()
  base64EncodedImages: string[];
  @IsEnum(FileType)
  type: string;
}
