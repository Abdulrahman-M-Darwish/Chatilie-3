import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { ImagesResolver } from './cloudinary.resolver';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, ImagesResolver],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
