import { client } from "@/components";
import { DocumentNode } from "@apollo/client";

export const updateCache = ({
	query,
	variables,
	data,
}: {
	query: DocumentNode;
	variables: any;
	data: (queryData: any) => any;
}) => {
	const queryData = client.readQuery({
		query,
		variables,
	});
	console.log(data(queryData));
	client.writeQuery({
		query,
		data: data(queryData),
		variables,
	});
};
