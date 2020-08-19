const { getRepoInfo } = require('../src/server/reposInfo');

exports.handler = async function(event, context) {
	const { owner, name } = event.queryStringParameters;
	if (owner && name) {
		return await getRepoInfo(owner, name);
	} else {
		return {
			statusCode: 400,
			body: 'Request must have "owner" and "name" params',
		};
	}
}
