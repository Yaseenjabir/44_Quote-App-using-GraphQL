import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    indivisualQuote(by: ID!): [Quote]
    profile: User
  }

  type QuoteWithName {
    quote: String
    by: IdName
  }

  type IdName {
    _id: String
    firstName: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
  }
  type Quote {
    _id: ID
    quote: String
    by: ID
  }

  type Token {
    token: String
  }

  type Mutation {
    userSignup(userNew: userInput): User
    userLogin(credentials: userInfo): Token
    createQuote(userQuote: String!): Quote
  }
  input userInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input userInfo {
    email: String!
    password: String!
  }
`;

export default typeDefs;
