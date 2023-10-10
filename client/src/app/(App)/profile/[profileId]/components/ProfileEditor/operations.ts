import { gql } from '@apollo/client';

export const UPLOAD_COVER = gql`
  mutation Upload($uploadImageInput: UploadImageInput!) {
    uploadImage(uploadImageInput: $uploadImageInput) {
      public_id
      version
      signature
      width
      height
      format
      resource_type
      created_at
      tags
      pages
      bytes
      type
      etag
      placeholder
      url
      secure_url
      access_mode
      original_filename
      moderation
      access_control
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $updateProfileId: ID!
    $updateProfileInput: UpdateProfileInput!
  ) {
    updateProfile(
      id: $updateProfileId
      updateProfileInput: $updateProfileInput
    ) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
    }
  }
`;
