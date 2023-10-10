import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($postsOwnerId: ID!) {
    posts(id: $postsOwnerId) {
      id
      comments
      createdAt
      likes
      privacy
      shares
      imagesSrc
      text
      author {
        avatar
        username
        name
      }
    }
  }
`;

export const GET_POSTS_AND_PROFILE = gql`
  query GetPosts($postsOwnerId: ID!) {
    profile(id: $postsOwnerId) {
      hobbies
      bio
    }
    posts(id: $postsOwnerId) {
      id
      comments
      createdAt
      likes
      privacy
      shares
      imagesSrc
      text
      author {
        avatar
        username
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      avatar
      birthDate
      username
      profile {
        id
        cover
        country
        bio
        gender
        livesIn
        education
        worksAt
        relationship
        certificates
        hobbies
        likes
        friends
        reputation
      }
    }
  }
`;
