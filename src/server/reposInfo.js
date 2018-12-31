const { query } = require('./graphQL');
const sanitizeString = require('../sanitizeString');

async function getRepoInfo(owner, name) {
	const result = await query(`
		query {
			repository(owner: "${ sanitizeString(owner) }", name: "${ sanitizeString(name) }") {
				url
				updatedAt
				stargazers(first: 0) {
					totalCount
				}
				openIssues: issues(first: 0, states: OPEN) {
					totalCount
				}
				closedIssues: issues(first: 0, states: CLOSED) {
					totalCount
				}
				openPRs: pullRequests(first: 0, states: OPEN) {
					totalCount
				}
				mergedPRs: pullRequests(first: 0, states: MERGED) {
					totalCount
				}
				languages(first: 50) {
					edges {
						node {
							name
						}
						size
					}
					totalSize
				}
			}
		}
	`);
	if (!result.data.repository) {
		return null;
	}
	return {
		...result.data.repository,
		owner,
		name,
		slug: `${ owner }/${ name }`
	};
}

async function getReposInfo(repos) {
	return await Promise.all(repos.map(async (repoSlug) => {
		const [owner, name] = repoSlug
			.split('/')
			.map((text) => sanitizeString(text));
		return await getRepoInfo(owner, name);
	}));
}

module.exports = { getReposInfo, getRepoInfo };
