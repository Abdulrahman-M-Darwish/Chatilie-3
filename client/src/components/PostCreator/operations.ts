import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      text
      imagesSrc
      privacy
      likes
      shares
      createdAt
      updatedAt
    }
  }
`;

export const UPLOAD_IMAGES = gql`
  mutation UploadImages($uploadImagesInput: UploadImagesInput!) {
    uploadImages(uploadImagesInput: $uploadImagesInput) {
      secure_url
    }
  }
`;
