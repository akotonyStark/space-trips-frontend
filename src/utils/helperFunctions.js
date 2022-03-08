import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const convertToID = (name) => {
  return name.split(" ").join("-");
};

export const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
  credentials: "same-origin",
  headers: {
    authorization: "Bearer API_KEY",
  },
});

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
