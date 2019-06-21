import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
///graphql client
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
const cache = new InMemoryCache();
const client = new ApolloClient({
	link: new HttpLink({
		uri: 'http://localhost:4000/graphql'
	}),
	cache,
});
///

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
