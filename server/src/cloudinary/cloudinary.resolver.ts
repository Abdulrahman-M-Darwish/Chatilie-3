import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CloudinaryService } from './cloudinary.service';
import { UploadImageInput } from './input/upload-image.input';
import { UploadImagesInput } from './input/upload-images.input';

@Resolver('Image')
export class ImagesResolver {
  constructor(private readonly uploaderService: CloudinaryService) {}
  @Mutation('uploadImage')
  uploadImage(
    @Args('uploadImageInput') uploadInput: UploadImageInput,
    @Context('req') context,
  ) {
    return this.uploaderService.uploadImage(context.user.id, uploadInput);
  }
  @Mutation('uploadImages')
  uploadImages(@Args('uploadImagesInput') uploadsInput: UploadImagesInput) {
    return this.uploaderService.uploadImages(uploadsInput);
  }
  @Query('findImage')
  findImage(@Args('imageId') imageId: string) {
    return this.uploaderService.findImage(imageId);
  }
}
