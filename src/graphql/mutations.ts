// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $authorId: String!) {
    createPost(title: $title, content: $content, authorId: $authorId) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`;