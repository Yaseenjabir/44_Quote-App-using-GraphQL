import bcrypt from "bcryptjs";
import { userModel } from "./models/userModel.js";
import jwt from "jsonwebtoken";
import { SECRECT_KEY } from "./config.js";
import { quoteModel } from "./models/quotesModel.js";
const resolvers = {
  Query: {
    users: async () => await userModel.find(),
    user: async (_, { _id }) => await userModel.findById({ _id }),
    quotes: async () => await quoteModel.find().populate("by", "_id firstName"),
    indivisualQuote: async (_, { by }) => await quoteModel.find({ by }),
    profile: async (_, args, { userId }) => {
      if (!userId) throw new Error("Invalid token");
      const user = await userModel.findOne({ _id: userId });
      return user;
    },
  },
  User: {
    quotes: async (user) => await quoteModel.find({ by: user._id }),
  },
  Mutation: {
    userSignup: async (_, { userNew }) => {
      const existingUser = await userModel.findOne({ email: userNew.email });
      if (existingUser) {
        throw new Error("User already exists with same email");
      }

      const hashedPassword = await bcrypt.hash(userNew.password, 10);
      console.log(hashedPassword);
      const newUser = new userModel({
        ...userNew,
        password: hashedPassword,
      });
      const data = await newUser.save();
      return data;
    },
    userLogin: async (_, { credentials }) => {
      const user = await userModel.findOne({ email: credentials.email });
      if (!user) {
        throw new Error("User does not registered with this email");
      }
      const matchedPassword = await bcrypt.compare(
        credentials.password,
        user.password
      );

      if (!matchedPassword) {
        throw new Error("Your password is invalid");
      }
      const token = jwt.sign({ userId: user._id }, SECRECT_KEY);
      return { token };
    },
    createQuote: async (_, { userQuote }, { userId }) => {
      if (!userId) throw new Error("Invalid token");

      const savedQuote = new quoteModel({
        quote: userQuote,
        by: userId,
      });

      const data = await savedQuote.save();

      return data;
    },
  },
};

export default resolvers;
