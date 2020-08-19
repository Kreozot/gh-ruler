const { getReposInfo } = require('../src/server/reposInfo');

exports.handler = async function(event) {
	const reposStr = event.queryStringParameters['repos[]'];
	if (reposStr) {
		try {
			const repos = reposStr.split(',');
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
			body: 'Request must have "repos" param',
		};
	}
};
