const { getReposInfo } = require('../src/server/reposInfo');

exports.handler = async function(event, context) {
	const { repos } = event.queryStringParameters;
	if (repos) {
		return await getReposInfo(repos);
	} else {
		return {
			statusCode: 400,
			body: 'Request must have "repos" param',
		};
	}
}
