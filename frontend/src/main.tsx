import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./_components/Home.tsx";
import Login from "./_components/Login.tsx";
import Signup from "./_components/Signup.tsx";
import CreateQuote from "./_components/CreateQuote.tsx";
import Profile from "./_components/Profile.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import OtherUserProfile from "./_components/OtherUserProfile.tsx";

const token = localStorage.getItem("token");
const parsedToken = token && JSON.parse(token);

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  headers: {
    authorization: parsedToken || "",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/create", element: <CreateQuote /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile/:userid", element: <OtherUserProfile /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
