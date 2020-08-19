const { getRepoInfo } = require('../src/server/reposInfo');

exports.handler = async function(event) {
	const { owner, name } = event.queryStringParameters;
	if (owner && name) {
		try {
			return await getRepoInfo(owner, name);
		} catch(err) {
			return {
				statusCode: 500,
				body: err,
			};
		}
	} else {
		return {
			statusCode: 400,
			body: 'Request must have "owner" and "name" params',
		};
	}
};
