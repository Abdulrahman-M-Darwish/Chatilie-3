"use client";
import store from "@/store";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
	uri: "http://localhost:8080/graphql",
	credentials: "include",
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: "ws://localhost:8080/graphql",
		connectionParams() {
			return { user: store.getState().user };
		},
	})
);

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export const Providers: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<ApolloProvider client={client}>
			<ReduxProvider store={store}>{children}</ReduxProvider>
		</ApolloProvider>
	);
};
