import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query Users($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      id
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser ($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser ($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;
