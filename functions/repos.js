const { getReposInfo } = require('../src/server/reposInfo');

exports.handler = async function(event) {
	const { repos } = event.queryStringParameters;
	if (repos) {
		try {
			const result = await getReposInfo(repos);
			return {
				statusCode: 200,
				body: JSON.stringify(result),
			};
		} catch(err) {
			return {
				statusCode: 500,
				body: err,
			};
		}
	} else {
		return {
			statusCode: 400,
			body: `Request must have "repos" param. Instead ${ event.queryStringParameters }`,
		};
	}
};
