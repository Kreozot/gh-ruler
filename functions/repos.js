const { getReposInfo } = require('./reposInfo');

exports.handler = async function(event, context) {
	const { repos } = JSON.parse(event.body);
	if (repos) {
		return getReposInfo(repos);
	} else {
		res.status(400).send('Request must have "repos" param');
	}
}
