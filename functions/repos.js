const { getReposInfo } = require('../src/server/reposInfo');

exports.handler = async function(event, context) {
	const { repos } = event.queryStringParameters;
	if (repos) {
		return getReposInfo(repos);
	} else {
		res.status(400).send('Request must have "repos" param');
	}
}
