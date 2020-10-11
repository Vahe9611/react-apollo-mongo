import { onError } from "@apollo/client/link/error";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { devLog } from 'utils';
import { ApolloClient } from '@apollo/client';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => 
      devLog(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }

  if (networkError) {
    devLog(`[Network error]: ${networkError}`)
  };
});

const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL, });

const link = ApolloLink.from([
  errorLink,
  httpLink,
]);

const client = new ApolloClient({ 
  link,
  cache: new InMemoryCache(),
});

export default client;
