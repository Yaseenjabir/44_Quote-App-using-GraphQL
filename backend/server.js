import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import mongoose from "mongoose";
import { MONGO_URL, SECRECT_KEY } from "./config.js";
import jwt from "jsonwebtoken";
mongoose.connect(MONGO_URL);

mongoose.connection.on("connection", () => console.log("Connected to DB"));
mongoose.connection.on("error", () => console.log("Failed to connect to DB"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const userId = jwt.verify(authorization, SECRECT_KEY);
      return userId;
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
