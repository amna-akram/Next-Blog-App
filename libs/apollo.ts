import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const httpLink: ApolloLink = createHttpLink({
  fetch,
  uri: process.env.NEXT_PUBLIC_GQL_URI,
  headers: {
    authorization: process.env.NEXT_PUBLIC_GQL_API_TOKEN,
  },
});
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
