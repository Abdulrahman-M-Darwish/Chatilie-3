import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2,
  ResourceApiResponse,
} from 'cloudinary';
import { UploadImageInput } from './input/upload-image.input';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UploadImagesInput } from './input/upload-images.input';

@Injectable()
export class CloudinaryService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  async uploadImage(
    id: string,
    { base64EncodedImage, type }: UploadImageInput,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const image = await v2.uploader.upload(base64EncodedImage, {
      folder: type,
      resource_type: 'image',
    });
    return image;
  }
  async uploadImages({ base64EncodedImages, type }: UploadImagesInput) {
    const images = [];
    for (let i = 0; i < base64EncodedImages.length; i++) {
      const uploadedImage = await v2.uploader.upload(base64EncodedImages[i], {
        folder: type,
        resource_type: 'image',
      });
      images.push(uploadedImage);
    }
    return images;
  }
  async findImage(
    imageId: string,
  ): Promise<ResourceApiResponse | UploadApiErrorResponse> {
    try {
      return await v2.api.resources_by_asset_ids(imageId);
    } catch (error) {}
  }
}
