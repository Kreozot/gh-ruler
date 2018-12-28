const { Router } = require('express');
const { getReposInfo, getRepoInfo } = require('./reposInfo');

class RepoRouter extends Router {
	constructor() {
		super();

		/**
		 * @api {get} /api/repos Get repositories info
		 * @apiName metrics
		 * @apiVersion 1.0.0
		 *
		 * @apiParam  {Object[]} repos Array of repositories slug (owner/name)
		 */
		this.get('/api/repos', async (req, res) => {
			const { repos } = req.query;
			if (repos) {
				const reposInfo = await getReposInfo(repos);
				res.status(200).send(reposInfo);
			} else {
				res.status(400).send('Request must have "repos" param');
			}
		});

		/**
		 * @api {get} /api/repo Get repository info
		 * @apiName metrics
		 * @apiVersion 1.0.0
		 *
		 * @apiParam  {Object[]} repos Array of repositories slug (owner/name)
		 */
		this.get('/api/repo', async (req, res) => {
			const { owner, name } = req.query;
			if (owner && name) {
				const repoInfo = await getRepoInfo(owner, name);
				if (repoInfo) {
					res.status(200).send(repoInfo);
				} else {
					res.status(404).send('Repository not found');
				}
			} else {
				res.status(400).send('Request must have "owner" and "name" params');
			}
		});
	}
}

module.exports = RepoRouter;
