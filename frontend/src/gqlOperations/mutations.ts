import { DocumentNode, gql } from "@apollo/client";

// Define mutation
export const SINGUP_USER: DocumentNode = gql`
  mutation createUser($userNew: userInput) {
    userSignup(userNew: $userNew) {
      _id
      firstName
      lastName
      email
      password
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($credentials: userInfo!) {
    userLogin(credentials: $credentials) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createQuote($name: String!) {
    createQuote(userQuote: $name) {
      quote
      by
    }
  }
`;
