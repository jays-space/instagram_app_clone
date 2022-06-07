import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import {createAuthLink, AuthOptions, AUTH_TYPE} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import awsConfig from '../aws-exports';

interface IClient {
  children: React.ReactNode;
}

const url = awsConfig.aws_appsync_graphqlEndpoint;
const region = awsConfig.aws_appsync_region;
const auth: AuthOptions = {
  type: awsConfig.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
  apiKey: awsConfig.aws_appsync_apiKey as AUTH_TYPE.API_KEY,
};

const httpLink = createHttpLink({uri: url});

const link = ApolloLink.from([
  createAuthLink({url, region, auth}),
  createSubscriptionHandshakeLink({url, region, auth}, httpLink),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const Client = ({children}: IClient) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
