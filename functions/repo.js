const { getRepoInfo } = require('../src/server/reposInfo');

exports.handler = async function(event, context) {
	const { owner, name } = event.queryStringParameters;
	if (owner && name) {
		return getRepoInfo(owner, name);
	} else {
		res.status(400).send('Request must have "owner" and "name" params');
	}
}
