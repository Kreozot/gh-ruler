const { getReposInfo } = require('../src/server/reposInfo');

exports.handler = async function(event) {
	const { repos } = event.queryStringParameters;
	if (repos) {
		try {
			return await getReposInfo(repos);
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
