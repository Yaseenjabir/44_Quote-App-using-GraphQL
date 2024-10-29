import { DocumentNode, gql } from "@apollo/client";

export const GET_ALL_QUOtES: DocumentNode = gql`
  query getAllQuotes {
    quotes {
      quote
      by {
        _id
        firstName
      }
    }
  }
`;

export const PROFILE = gql`
  query getMyProfile {
    profile {
      firstName
      lastName
      email
      quotes {
        quote
      }
    }
  }
`;
export const GET_OTHER_USER_PROFILE = gql`
  query getOtherUserProfile($userid: ID!) {
    user(_id: $userid) {
      _id
      firstName
      lastName
      email
      password
      quotes {
        quote
      }
    }
  }
`;
